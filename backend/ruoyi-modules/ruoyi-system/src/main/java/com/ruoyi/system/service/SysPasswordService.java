package com.ruoyi.system.service;

import cn.dev33.satoken.secure.BCrypt;
import cn.dev33.satoken.stp.StpUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.RandomUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.ruoyi.common.core.constant.CacheConstants;
import com.ruoyi.common.core.exception.ServiceException;
import com.ruoyi.common.core.utils.StringUtils;
import com.ruoyi.common.redis.utils.RedisUtils;
import com.ruoyi.system.domain.entity.SysUser;
import com.ruoyi.system.mapper.SysUserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Duration;

/**
 * 密码找回服务
 */
@Slf4j
@RequiredArgsConstructor
@Service
public class SysPasswordService {

    private final SysUserMapper userMapper;

    /**
     * 发送忘记密码验证码
     */
    public void sendForgotPasswordCode(String username, String contact) {
        // 1. 查用户
        SysUser user = userMapper.selectOne(new LambdaQueryWrapper<SysUser>().eq(SysUser::getUserName, username));
        if (user == null) {
            log.warn("忘记密码：用户 {} 不存在", username);
            return; 
        }
        
        // 2. 校验 Contact 是否匹配
        boolean isMatch = contact.equals(user.getEmail()) || contact.equals(user.getPhonenumber());
        if (!isMatch) {
            throw new ServiceException("绑定的手机/邮箱不匹配");
        }

        // 3. 生成验证码 & 存 Redis
        String code = RandomUtil.randomNumbers(6);
        String key = CacheConstants.FORGOT_PWD_CODE_KEY + username;
        // 频控：60s 内不能重发
        if (!RedisUtils.setIfAbsent(key + ":lock", "1", Duration.ofSeconds(60))) {
            throw new ServiceException("发送太频繁，请稍后再试");
        }
        RedisUtils.setCacheObject(key, code, Duration.ofMinutes(5));

        // 4. 发送 (模拟发送，实际对接 SMS/Email 服务)
        log.info("用户 {} 找回密码验证码：{}", username, code);
        // SmsUtils.send(contact, code); 或 MailUtils.send(contact, code);
    }

    /**
     * 校验验证码 & 换取 Token
     */
    public String verifyForgotPasswordCode(String username, String contact, String code) {
        // 1. 校验验证码
        String key = CacheConstants.FORGOT_PWD_CODE_KEY + username;
        String cacheCode = RedisUtils.getCacheObject(key);
        if (StringUtils.isEmpty(cacheCode)) {
            throw new ServiceException("验证码已过期");
        }
        if (!cacheCode.equals(code)) {
            throw new ServiceException("验证码错误");
        }
        
        // 2. 验证通过，删除验证码，生成一次性 Token
        RedisUtils.deleteObject(key);
        String resetToken = IdUtil.fastSimpleUUID();
        
        // 3. 存 Token -> Username 映射 (TTL 10分钟)
        String tokenKey = CacheConstants.FORGOT_PWD_TOKEN_KEY + resetToken;
        RedisUtils.setCacheObject(tokenKey, username, Duration.ofMinutes(10));
        
        return resetToken;
    }

    /**
     * 重置密码
     */
    public void resetPassword(String resetToken, String newPassword) {
        // 1. 校验 Token
        String tokenKey = CacheConstants.FORGOT_PWD_TOKEN_KEY + resetToken;
        String username = RedisUtils.getCacheObject(tokenKey);
        if (StringUtils.isEmpty(username)) {
            throw new ServiceException("重置链接已失效，请重新验证");
        }
        
        // 2. 校验密码强度 (可选)
        if (newPassword.length() < 6) {
             throw new ServiceException("密码长度不能少于6位");
        }

        // 3. 更新密码
        SysUser user = userMapper.selectOne(new LambdaQueryWrapper<SysUser>().eq(SysUser::getUserName, username));
        if (user != null) {
            user.setPassword(BCrypt.hashpw(newPassword)); // 加密
            userMapper.updateById(user);
            // 踢下线
            StpUtil.kickout(user.getUserId());
        }
        
        // 4. 清理 Token
        RedisUtils.deleteObject(tokenKey);
    }
}
