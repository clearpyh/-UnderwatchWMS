package com.ruoyi.system.controller.system;

import cn.dev33.satoken.annotation.SaIgnore;
import com.ruoyi.common.core.domain.R;
import com.ruoyi.common.core.domain.bo.ForgotPasswordBody;
import com.ruoyi.system.service.SysPasswordService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * 忘记密码接口
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/auth/forgot-password")
public class SysForgotPasswordController {

    private final SysPasswordService passwordService;

    /**
     * 1. 发送验证码
     */
    @PostMapping("/code")
    @SaIgnore // 免登录
    public R<Void> sendCode(@RequestBody ForgotPasswordBody body) {
        passwordService.sendForgotPasswordCode(body.getUsername(), body.getContact());
        return R.ok("验证码已发送");
    }

    /**
     * 2. 校验验证码，换取 ResetToken
     */
    @PostMapping("/verify")
    @SaIgnore
    public R<Map<String, String>> verifyCode(@RequestBody ForgotPasswordBody body) {
        String resetToken = passwordService.verifyForgotPasswordCode(body.getUsername(), body.getContact(), body.getCode());
        return R.ok(Map.of("resetToken", resetToken));
    }

    /**
     * 3. 重置密码
     */
    @PostMapping("/reset")
    @SaIgnore
    public R<Void> resetPassword(@RequestBody ForgotPasswordBody body) {
        passwordService.resetPassword(body.getResetToken(), body.getNewPassword());
        return R.ok("密码重置成功");
    }
}
