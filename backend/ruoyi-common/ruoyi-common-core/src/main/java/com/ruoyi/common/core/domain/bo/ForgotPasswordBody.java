package com.ruoyi.common.core.domain.bo;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ForgotPasswordBody {
    /**
     * 用户名（必填，用于定位用户）
     */
    @NotBlank(message = "用户名不能为空")
    private String username;

    /**
     * 联系方式（邮箱或手机号，用于验证）
     */
    @NotBlank(message = "联系方式不能为空")
    private String contact; // 邮箱或手机号

    /**
     * 验证码（第一步发码时不需要，第二步校验时必填）
     */
    private String code;
    
    /**
     * 重置令牌（第三步重置密码时必填）
     */
    private String resetToken;
    
    /**
     * 新密码（第三步重置密码时必填）
     */
    private String newPassword;
}
