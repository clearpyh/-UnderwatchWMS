<template>
  <div class="login-container">
    <div class="login-background">
      <div class="gradient-bg"></div>
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>

    <div class="cat-large">
      <svg class="cat-svg" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cat-gradient-large-forgot" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#a18cd1;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#fbc2eb;stop-opacity:1" />
          </linearGradient>
        </defs>
        <path d="M50 80 L70 30 L100 80 Z" fill="url(#cat-gradient-large-forgot)" opacity="0.9"/>
        <path d="M150 80 L130 30 L100 80 Z" fill="url(#cat-gradient-large-forgot)" opacity="0.9"/>
        <path d="M50 100 Q50 40 100 40 Q150 40 150 100" fill="#fff" stroke="url(#cat-gradient-large-forgot)" stroke-width="3"/>

        <g class="eye">
          <ellipse cx="80" cy="75" rx="12" ry="14" fill="#f4f6f8" stroke="#dcdfe6" stroke-width="1"/>
          <circle ref="leftPupilRef" cx="80" cy="75" r="5" fill="#303133" class="pupil"/>
          <circle cx="82" cy="73" r="2" fill="#fff" opacity="0.6"/>
        </g>

        <g class="eye">
          <ellipse cx="120" cy="75" rx="12" ry="14" fill="#f4f6f8" stroke="#dcdfe6" stroke-width="1"/>
          <circle ref="rightPupilRef" cx="120" cy="75" r="5" fill="#303133" class="pupil"/>
          <circle cx="122" cy="73" r="2" fill="#fff" opacity="0.6"/>
        </g>

        <path d="M96 88 L104 88 L100 94 Z" fill="#ff9a9e"/>

        <path d="M20 100 Q20 80 40 80 Q60 80 60 100" fill="#fff" stroke="url(#cat-gradient-large-forgot)" stroke-width="3" transform="translate(-10, 10)"/>
        <path d="M140 100 Q140 80 160 80 Q180 80 180 100" fill="#fff" stroke="url(#cat-gradient-large-forgot)" stroke-width="3" transform="translate(10, 10)"/>
      </svg>
    </div>

    <div class="login-content">
      <div class="login-left">
        <div class="brand-info">
          <div class="logo underwatch-logo">
            <img
              src="@/assets/logo/underwatch-cat.png"
              alt="Underwatch Cat"
              class="cat-logo"
            />
            <svg-icon icon-class="logo" class="logo-icon" />
          </div>
          <h1 class="brand-name">UnderWatch</h1>
          <h2 class="brand-title">智能仓储管理系统</h2>
          <p class="brand-desc">高效管理 · 智能盘点 · 实时追踪</p>

          <div class="feature-list">
            <div class="feature-item">
              <div class="feature-icon">
                <svg-icon icon-class="component" />
              </div>
              <span>智能入库</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <svg-icon icon-class="list" />
              </div>
              <span>精准盘点</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <svg-icon icon-class="chart" />
              </div>
              <span>数据可视化</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                <svg-icon icon-class="server" />
              </div>
              <span>实时监控</span>
            </div>
          </div>
        </div>
      </div>

      <div class="login-right">
        <div class="login-box">
          <div class="login-header">
            <h2>找回密码</h2>
            <p class="guardian-text">先完成身份验证，再设置新密码（当前仅界面）。</p>
          </div>

          <div class="reset-steps">
            <div class="step is-active">
              <div class="dot"></div>
              <div class="label">验证身份</div>
            </div>
            <div class="line"></div>
            <div class="step">
              <div class="dot"></div>
              <div class="label">设置新密码</div>
            </div>
            <div class="line"></div>
            <div class="step">
              <div class="dot"></div>
              <div class="label">完成</div>
            </div>
          </div>

          <el-form ref="formRef" :model="form" :rules="rules" class="login-form">
            <el-form-item prop="username">
              <div class="input-wrapper" :class="{ 'is-focused': focusState === 'username' }">
                <div class="input-icon-wrapper">
                  <svg-icon icon-class="user" class="input-icon" />
                </div>
                <el-input
                  v-model="form.username"
                  type="text"
                  size="large"
                  auto-complete="off"
                  placeholder="请输入账号"
                  class="custom-input"
                  @focus="handleFocus('username')"
                  @blur="handleBlur"
                />
              </div>
            </el-form-item>

            <el-form-item prop="contact">
              <div class="input-wrapper" :class="{ 'is-focused': focusState === 'contact' }">
                <div class="input-icon-wrapper">
                  <svg-icon icon-class="email" class="input-icon" />
                </div>
                <el-input
                  v-model="form.contact"
                  type="text"
                  size="large"
                  auto-complete="off"
                  placeholder="请输入邮箱/手机号"
                  class="custom-input"
                  @focus="handleFocus('contact')"
                  @blur="handleBlur"
                />
              </div>
            </el-form-item>

            <el-form-item prop="code">
              <div class="code-row">
                <div class="input-wrapper" :class="{ 'is-focused': focusState === 'code' }">
                  <div class="input-icon-wrapper">
                    <svg-icon icon-class="validCode" class="input-icon" />
                  </div>
                <el-input
                  v-model="form.code"
                  type="text"
                  size="large"
                  auto-complete="off"
                  placeholder="请输入验证码"
                  class="custom-input"
                  @focus="handleFocus('code')"
                  @blur="handleBlur"
                />
              </div>
              <el-button
                class="send-code-btn"
                size="large"
                :loading="sending"
                :disabled="cooldown > 0"
                @click.prevent="handleSendCode"
              >
                {{ cooldown > 0 ? `已发送(${cooldown}s)` : '发送验证码' }}
              </el-button>
            </div>
          </el-form-item>

            <el-form-item prop="newPassword">
              <div class="input-wrapper" :class="{ 'is-focused': focusState === 'newPassword' }">
                <div class="input-icon-wrapper">
                  <svg-icon icon-class="password" class="input-icon" />
                </div>
                <el-input
                  v-model="form.newPassword"
                  type="password"
                  size="large"
                  auto-complete="off"
                  placeholder="请输入新密码"
                  class="custom-input"
                  @focus="handleFocus('newPassword')"
                  @blur="handleBlur"
                />
              </div>
            </el-form-item>

            <el-form-item prop="confirmPassword">
              <div class="input-wrapper" :class="{ 'is-focused': focusState === 'confirmPassword' }">
                <div class="input-icon-wrapper">
                  <svg-icon icon-class="password" class="input-icon" />
                </div>
                <el-input
                  v-model="form.confirmPassword"
                  type="password"
                  size="large"
                  auto-complete="off"
                  placeholder="请再次输入新密码"
                  class="custom-input"
                  @focus="handleFocus('confirmPassword')"
                  @blur="handleBlur"
                />
              </div>
            </el-form-item>

            <el-form-item style="width:100%;">
              <el-button size="large" type="primary" class="login-btn" @click.prevent="handleSubmit">
                提 交
              </el-button>
            </el-form-item>

            <div class="register-link">
              <router-link to="/login">返回登录</router-link>
              <router-link to="/register">去注册</router-link>
            </div>
          </el-form>
        </div>
      </div>
    </div>

    <div class="login-footer">
      <span>WMS智能仓储管理系统</span>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { forgotPasswordReset, forgotPasswordSendCode, forgotPasswordVerify } from '@/api/auth/forgotPassword'

const leftPupilRef = ref(null)
const rightPupilRef = ref(null)
const focusState = ref('idle')
const lastMouseX = ref(0)
const lastMouseY = ref(0)
const animationFrameId = ref(null)

const formRef = ref()
const form = ref({
  username: '',
  contact: '',
  code: '',
  newPassword: '',
  confirmPassword: ''
})

const sending = ref(false)
const cooldown = ref(0)
let cooldownTimer = 0

const rules = {
  username: [{ required: true, trigger: 'blur', message: '请输入账号' }],
  contact: [{ required: true, trigger: 'blur', message: '请输入邮箱/手机号' }],
  code: [{ required: true, trigger: 'blur', message: '请输入验证码' }],
  newPassword: [{ required: true, trigger: 'blur', message: '请输入新密码' }],
  confirmPassword: [
    { required: true, trigger: 'blur', message: '请再次输入新密码' },
    {
      validator: (_, value, callback) => {
        if (value !== form.value.newPassword) callback(new Error('两次密码输入不一致'))
        else callback()
      },
      trigger: 'blur'
    }
  ]
}

const handleFocus = (type) => {
  focusState.value = type
  updateEyes()
}

const handleBlur = () => {
  focusState.value = 'idle'
  updateEyes()
}

const handleMouseMove = (event) => {
  if (!event.force) {
    lastMouseX.value = event.clientX
    lastMouseY.value = event.clientY
  }
  if (animationFrameId.value) cancelAnimationFrame(animationFrameId.value)
  animationFrameId.value = requestAnimationFrame(() => updateEyes())
}

const updateEyes = () => {
  const pupils = [leftPupilRef.value, rightPupilRef.value]
  if (!pupils[0] || !pupils[1]) return
  const leftRect = pupils[0].getBoundingClientRect()
  const rightRect = pupils[1].getBoundingClientRect()
  updatePupil(pupils[0], leftRect, lastMouseX.value, lastMouseY.value)
  updatePupil(pupils[1], rightRect, lastMouseX.value, lastMouseY.value)
}

const updatePupil = (pupil, rect, targetX, targetY) => {
  const x = rect.left + rect.width / 2
  const y = rect.top + rect.height / 2
  const dx = targetX - x
  const dy = targetY - y
  const angle = Math.atan2(dy, dx)
  const dist = Math.min(8, Math.hypot(dx, dy) / 30)
  pupil.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`
}

async function handleSendCode() {
  if (sending.value) return
  if (!form.value.username || !form.value.contact) {
    ElMessage.warning('请先输入账号和邮箱/手机号')
    return
  }
  if (cooldown.value > 0) return
  sending.value = true
  try {
    await forgotPasswordSendCode({
      username: form.value.username,
      contact: form.value.contact
    })
    ElMessage.success('验证码已发送（后端目前在控制台打印）')
    cooldown.value = 60
    window.clearInterval(cooldownTimer)
    cooldownTimer = window.setInterval(() => {
      cooldown.value = Math.max(0, cooldown.value - 1)
      if (cooldown.value === 0) window.clearInterval(cooldownTimer)
    }, 1000)
  } finally {
    sending.value = false
  }
}

function handleSubmit() {
  formRef.value?.validate((valid) => {
    if (!valid) return
    doReset()
  })
}

async function doReset() {
  try {
    const verifyRes = await forgotPasswordVerify({
      username: form.value.username,
      contact: form.value.contact,
      code: form.value.code
    })
    const resetToken = verifyRes?.data?.resetToken
    if (!resetToken) {
      ElMessage.error('未获取到 resetToken')
      return
    }
    await forgotPasswordReset({
      resetToken,
      newPassword: form.value.newPassword
    })
    ElMessage.success('密码重置成功，请使用新密码登录')
    window.setTimeout(() => {
      window.location.href = import.meta.env.VITE_APP_CONTEXT_PATH + 'login'
    }, 800)
  } catch (e) {
    ElMessage.error(e?.message || '找回密码失败')
  }
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  if (animationFrameId.value) cancelAnimationFrame(animationFrameId.value)
  window.clearInterval(cooldownTimer)
})
</script>

<style lang="scss" scoped>
.underwatch-logo {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.8),
    rgba(240, 244, 255, 0.6)
  );
}

.cat-logo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: drop-shadow(0 4px 8px rgba(161, 140, 209, 0.35));
  transition: transform 0.4s ease;
}

.logo:hover .cat-logo {
  transform: scale(1.08) rotate(-6deg);
}

.login-container {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.login-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.gradient-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;
  background-image:
    radial-gradient(at 0% 0%, rgba(64, 158, 255, 0.2) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(64, 158, 255, 0.2) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(56, 189, 248, 0.2) 0px, transparent 50%),
    radial-gradient(at 0% 100%, rgba(56, 189, 248, 0.2) 0px, transparent 50%);
  filter: blur(60px);
  opacity: 0.8;
}

.shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  z-index: 0;
  animation: float 10s ease-in-out infinite;
}

.shape-1 {
  width: 500px;
  height: 500px;
  top: -150px;
  left: -150px;
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.3) 0%, rgba(56, 189, 248, 0.2) 100%);
  animation-delay: 0s;
}

.shape-2 {
  width: 400px;
  height: 400px;
  bottom: -100px;
  right: -100px;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.3) 0%, rgba(64, 158, 255, 0.2) 100%);
  animation-delay: -3s;
}

.shape-3 {
  width: 300px;
  height: 300px;
  top: 40%;
  left: 40%;
  background: linear-gradient(135deg, rgba(144, 147, 153, 0.1) 0%, rgba(255, 255, 255, 0.2) 100%);
  animation-delay: -6s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(20px, -20px) rotate(5deg);
  }
}

.cat-large {
  position: absolute;
  top: 14%;
  right: 10%;
  transform: rotate(-8deg);
  z-index: 1;
  opacity: 0.55;
  pointer-events: none;
}

.cat-svg {
  width: 180px;
  height: 90px;
  filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.1));
}

.pupil {
  transition: transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
  transform-box: fill-box;
  transform-origin: center;
}

.login-content {
  position: relative;
  z-index: 1;
  display: flex;
  min-height: 100vh;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px;
  align-items: center;
  justify-content: space-between;
}

.login-left {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 60px;
}

.brand-info {
  text-align: center;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo {
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 40px rgba(64, 158, 255, 0.2);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%);
    opacity: 0;
    transition: opacity 0.3s;
  }
}

.logo:hover {
  transform: translateY(-5px) rotate(5deg);
  box-shadow: 0 20px 50px rgba(64, 158, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.8);

  &::before {
    opacity: 1;
  }
}

.logo-icon {
  font-size: 50px;
  color: #409eff;
  filter: drop-shadow(0 4px 8px rgba(64, 158, 255, 0.3));
}

.brand-name {
  font-size: 32px;
  font-weight: 800;
  background: linear-gradient(135deg, #409eff 0%, #38bdf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 10px 0;
}

.brand-title {
  font-size: 18px;
  color: #303133;
  margin: 0 0 15px 0;
  font-weight: 600;
}

.brand-desc {
  font-size: 14px;
  color: #718096;
  margin: 0 0 50px 0;
  letter-spacing: 8px;
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 400px;
  margin: 0 auto;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(64, 158, 255, 0.2);
  background: rgba(255, 255, 255, 0.7);
  border-color: rgba(255, 255, 255, 0.8);
}

.feature-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #409EFF 0%, #66b1ff 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.feature-icon .svg-icon {
  font-size: 20px;
  color: #fff;
}

.feature-item span {
  font-size: 14px;
  color: #4a5568;
  font-weight: 500;
}

.login-right {
  flex: 1;
  display: flex;
  justify-content: center;
  max-width: 480px;
}

.login-box {
  width: 100%;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 24px;
  padding: 50px 40px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.login-header h2 {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 10px 0;
  letter-spacing: 1px;
}

.login-header p {
  font-size: 14px;
  color: #718096;
  margin: 0;
}

.reset-steps {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(64, 158, 255, 0.12);
  margin-bottom: 18px;
}

.reset-steps .step {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #909399;
  font-weight: 600;
  font-size: 13px;
  white-space: nowrap;
}

.reset-steps .step .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(144, 147, 153, 0.35);
}

.reset-steps .step.is-active {
  color: #409eff;
}

.reset-steps .step.is-active .dot {
  background: #409eff;
  box-shadow: 0 0 0 4px rgba(64, 158, 255, 0.15);
}

.reset-steps .line {
  flex: 1;
  height: 1px;
  background: rgba(64, 158, 255, 0.15);
}

.code-row {
  display: grid;
  grid-template-columns: 1fr 120px;
  gap: 10px;
  width: 100%;
}

.send-code-btn {
  height: 50px;
  border-radius: 12px;
  font-weight: 700;
}

.login-header h2 {
  margin: 0 0 10px 0;
  font-size: 26px;
  font-weight: 700;
  color: #303133;
}

.guardian-text {
  margin: 0 0 30px 0;
  color: #606266;
  font-size: 14px;
  line-height: 1.5;
}

.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid rgba(220, 223, 230, 0.6);
  border-radius: 12px;
  padding: 0 15px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.6);
}

.input-wrapper.is-focused {
  border-color: rgba(64, 158, 255, 0.8);
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.1);
  background: rgba(255, 255, 255, 0.9);
}

.input-icon-wrapper {
  margin-right: 10px;
  display: flex;
  align-items: center;
}

.input-icon {
  font-size: 18px;
  color: #909399;
}

.custom-input :deep(.el-input__wrapper) {
  box-shadow: none;
  background: transparent;
  padding: 0;
}

.custom-input :deep(.el-input__inner) {
  height: 48px;
  line-height: 48px;
}

.login-btn {
  width: 100%;
  height: 50px;
  border-radius: 12px;
  font-weight: 700;
  letter-spacing: 2px;
}

.register-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #718096;
}

.register-link a {
  color: #409EFF;
  text-decoration: none;
  font-weight: 500;
  margin-left: 5px;
  transition: color 0.3s ease;

  &:hover {
    color: #66b1ff;
  }
}

.login-footer {
  position: absolute;
  bottom: 25px;
  width: 100%;
  text-align: center;
  color: #909399;
  font-size: 13px;
  z-index: 1;
}
</style>
