<template>
  <div class="login-container">
    <div class="login-background">
      <div class="gradient-bg"></div>
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>
    
    <!-- 巨型跟随猫 (Option 3) -->
    <div class="cat-large">
      <svg class="cat-svg" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cat-gradient-large" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#a18cd1;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#fbc2eb;stop-opacity:1" />
          </linearGradient>
        </defs>
        <!-- 耳朵 -->
        <path d="M50 80 L70 30 L100 80 Z" fill="url(#cat-gradient-large)" opacity="0.9"/>
        <path d="M150 80 L130 30 L100 80 Z" fill="url(#cat-gradient-large)" opacity="0.9"/>
        <!-- 头部轮廓 -->
        <path d="M50 100 Q50 40 100 40 Q150 40 150 100" fill="#fff" stroke="url(#cat-gradient-large)" stroke-width="3"/>
        
        <!-- 左眼 -->
        <g class="eye">
          <ellipse cx="80" cy="75" rx="12" ry="14" fill="#f4f6f8" stroke="#dcdfe6" stroke-width="1"/>
          <circle ref="leftPupilRef" cx="80" cy="75" r="5" fill="#303133" class="pupil"/>
          <circle cx="82" cy="73" r="2" fill="#fff" opacity="0.6"/>
        </g>
        
        <!-- 右眼 -->
        <g class="eye">
          <ellipse cx="120" cy="75" rx="12" ry="14" fill="#f4f6f8" stroke="#dcdfe6" stroke-width="1"/>
          <circle ref="rightPupilRef" cx="120" cy="75" r="5" fill="#303133" class="pupil"/>
          <circle cx="122" cy="73" r="2" fill="#fff" opacity="0.6"/>
        </g>
        
        <!-- 鼻子 -->
        <path d="M96 88 L104 88 L100 94 Z" fill="#ff9a9e"/>
        
        <!-- 爪子 (增加爪子以体现"怀里"的感觉) -->
        <path d="M20 100 Q20 80 40 80 Q60 80 60 100" fill="#fff" stroke="url(#cat-gradient-large)" stroke-width="3" transform="translate(-10, 10)"/>
        <path d="M140 100 Q140 80 160 80 Q180 80 180 100" fill="#fff" stroke="url(#cat-gradient-large)" stroke-width="3" transform="translate(10, 10)"/>
      </svg>
    </div>

    <div class="login-content">
      <div class="login-left">
        <div class="brand-info">
          <div class="logo underwatch-logo" @click="handleMeow">
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
            <h2>用户注册</h2>
            <p class="guardian-text">新伙伴？系统管家正在录入您的指纹。</p>
          </div>
          
          <el-form ref="registerRef" :model="registerForm" :rules="registerRules" class="login-form">
            <el-form-item prop="username">
              <div class="input-wrapper" :class="{ 'is-focused': focusState === 'username' }">
                <div class="input-icon-wrapper">
                  <svg-icon icon-class="user" class="input-icon" />
                </div>
                <el-input
                  v-model="registerForm.username"
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
            
            <el-form-item prop="password">
              <div class="input-wrapper" :class="{ 'is-focused': focusState === 'password' }">
                <div class="input-icon-wrapper">
                  <svg-icon icon-class="password" class="input-icon" />
                </div>
                <el-input
                  v-model="registerForm.password"
                  type="password"
                  size="large"
                  auto-complete="off"
                  placeholder="请输入密码"
                  @keyup.enter="handleRegister"
                  class="custom-input"
                  @focus="handleFocus('password')"
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
                  v-model="registerForm.confirmPassword"
                  type="password"
                  size="large"
                  auto-complete="off"
                  placeholder="请再次输入密码"
                  @keyup.enter="handleRegister"
                  class="custom-input"
                  @focus="handleFocus('confirmPassword')"
                  @blur="handleBlur"
                />
              </div>
            </el-form-item>
            
            <el-form-item prop="code" v-if="captchaEnabled">
              <div class="input-wrapper">
                <div class="input-icon-wrapper">
                  <svg-icon icon-class="validCode" class="input-icon" />
                </div>
                <el-input
                  v-model="registerForm.code"
                  size="large"
                  auto-complete="off"
                  placeholder="请输入验证码"
                  class="custom-input verify-code"
                  @keyup.enter="handleRegister"
                />
                <div class="code-btn" @click="getCode">
                  <img v-if="codeUrl" :src="codeUrl" class="code-img"/>
                </div>
              </div>
            </el-form-item>
            
            <el-form-item style="width:100%;">
              <el-button
                :loading="loading"
                size="large"
                type="primary"
                class="login-btn"
                @click.prevent="handleRegister"
              >
                <span v-if="!loading">注 册</span>
                <span v-else>注册中...</span>
              </el-button>
            </el-form-item>
            
            <div class="register-link">
              <span>已有账号?</span>
              <router-link to="/login">立即登录</router-link>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  <!-- 底部 -->
    <div class="login-footer">
      <span>© 2026 WMS · Everything is under watch</span>
    </div>
  </div>
</template>

<script setup>
import { getCodeImg, register } from "@/api/login";

const router = useRouter();
const { proxy } = getCurrentInstance();

const registerForm = ref({
  username: "",
  password: "",
  confirmPassword: "",
  code: "",
  uuid: ""
});

const leftPupilRef = ref(null);
const rightPupilRef = ref(null);
const focusState = ref('idle');

// 添加新变量
const lastMouseX = ref(0);
const lastMouseY = ref(0);
const animationFrameId = ref(null);

// 焦点管理
const handleFocus = (type) => {
  focusState.value = type;
  // 触发一次更新以立即对齐视线
  updateEyes();
};

const handleBlur = () => {
  focusState.value = 'idle';
  // 触发一次更新以恢复鼠标跟随
  updateEyes();
};

// 优化的鼠标移动监听 - 巨型小猫视线跟随
const handleMouseMove = (event) => {
  if (!event.force) {
    lastMouseX.value = event.clientX;
    lastMouseY.value = event.clientY;
  }
  
  // 使用 requestAnimationFrame 优化性能
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value);
  }
  
  animationFrameId.value = requestAnimationFrame(() => {
    updateEyes();
  });
};

// 分离出的更新眼睛函数
const updateEyes = () => {
  const pupils = [leftPupilRef.value, rightPupilRef.value];
  
  // 如果瞳孔元素不存在，直接返回
  if (!pupils[0] || !pupils[1]) return;
  
  // 一次性获取所有rect，避免多次重排
  const leftRect = pupils[0].getBoundingClientRect();
  const rightRect = pupils[1].getBoundingClientRect();
  
  let targetX, targetY;

  if (focusState.value === 'username') {
    targetX = window.innerWidth * 0.35;
    targetY = window.innerHeight * 0.45;
  } else if (focusState.value === 'password' || focusState.value === 'confirmPassword') {
    targetX = window.innerWidth * 0.35;
    targetY = window.innerHeight * 0.55;
  } else {
    targetX = lastMouseX.value;
    targetY = lastMouseY.value;
  }

  // 分别计算两个眼睛的位置
  updatePupil(pupils[0], leftRect, targetX, targetY);
  updatePupil(pupils[1], rightRect, targetX, targetY);
};

// 更新单个瞳孔的位置
const updatePupil = (pupil, rect, targetX, targetY) => {
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  
  const dx = targetX - x;
  const dy = targetY - y;
  const angle = Math.atan2(dy, dx);
  
  // 根据状态调整移动距离
  let maxDist = focusState.value === 'idle' ? 8 : 6;
  const dist = Math.min(maxDist, Math.hypot(dx, dy) / 30);
  
  const moveX = Math.cos(angle) * dist;
  const moveY = Math.sin(angle) * dist;
  
  // 使用 transform 而不是直接修改样式
  pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
};

// 喵喵特效
const handleMeow = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top;

  const span = document.createElement('span');
  span.textContent = '喵喵~';
  span.style.position = 'fixed';
  span.style.left = `${x}px`;
  span.style.top = `${y}px`;
  span.style.transform = 'translate(-50%, -100%)';
  span.style.color = '#409EFF';
  span.style.fontWeight = 'bold';
  span.style.fontSize = '16px';
  span.style.pointerEvents = 'none';
  span.style.zIndex = '9999';
  span.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  span.style.opacity = '1';
  span.style.textShadow = '0 2px 4px rgba(0,0,0,0.1)';

  document.body.appendChild(span);

  // 强制重绘
  requestAnimationFrame(() => {
    span.style.top = `${y - 60}px`;
    span.style.opacity = '0';
    span.style.transform = 'translate(-50%, -100%) scale(1.2)';
  });

  setTimeout(() => {
    document.body.removeChild(span);
  }, 800);
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
  
  // 初始设置眼睛位置
  setTimeout(() => {
    updateEyes();
  }, 100);
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  if (animationFrameId.value) {
    cancelAnimationFrame(animationFrameId.value);
  }
});

const equalToPassword = (rule, value, callback) => {
  if (registerForm.value.password !== value) {
    callback(new Error("两次输入的密码不一致"));
  } else {
    callback();
  }
};

const registerRules = {
  username: [
    { required: true, trigger: "blur", message: "请输入您的账号" },
    { min: 2, max: 20, message: "用户账号长度必须介于 2 和 20 之间", trigger: "blur" }
  ],
  password: [
    { required: true, trigger: "blur", message: "请输入您的密码" },
    { min: 5, max: 20, message: "用户密码长度必须介于 5 和 20 之间", trigger: "blur" }
  ],
  confirmPassword: [
    { required: true, trigger: "blur", message: "请再次输入您的密码" },
    { required: true, validator: equalToPassword, trigger: "blur" }
  ],
  code: [{ required: true, trigger: "change", message: "请输入验证码" }]
};

const codeUrl = ref("");
const loading = ref(false);
const captchaEnabled = ref(true);

function handleRegister() {
  proxy.$refs.registerRef.validate(valid => {
    if (valid) {
      loading.value = true;
      register(registerForm.value).then(res => {
        ElMessage({
          message: '注册成功，即将跳转到登录页',
          type: 'success',
        })
        setTimeout(() => {
          router.push("/login");
        }, 1500)
      }).catch(() => {
        loading.value = false;
        if (captchaEnabled.value) {
          getCode();
        }
      });
    }
  });
}

function getCode() {
  getCodeImg().then(res => {
    captchaEnabled.value = res.data.captchaEnabled === undefined ? true : res.data.captchaEnabled;
    if (captchaEnabled.value) {
      codeUrl.value = "data:image/gif;base64," + res.data.img;
      registerForm.value.uuid = res.data.uuid;
    }
  });
}

getCode();
</script>

<style lang='scss' scoped>
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
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 50%, #dbe6f6 100%);
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.1) 0%, rgba(64, 158, 255, 0.05) 100%);
  animation: float 8s ease-in-out infinite;
}

.shape-1 {
  width: 400px;
  height: 400px;
  top: -100px;
  left: -100px;
  animation-delay: 0s;
}

.shape-2 {
  width: 300px;
  height: 300px;
  bottom: 10%;
  right: 10%;
  animation-delay: 2s;
  background: linear-gradient(135deg, rgba(103, 194, 58, 0.1) 0%, rgba(103, 194, 58, 0.05) 100%);
}

.shape-3 {
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  animation-delay: 4s;
  background: linear-gradient(135deg, rgba(144, 147, 153, 0.1) 0%, rgba(144, 147, 153, 0.05) 100%);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
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
  color: #409EFF;
  filter: drop-shadow(0 4px 8px rgba(64, 158, 255, 0.3));
}

.brand-name {
  font-size: 48px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 10px 0;
  letter-spacing: 4px;
}

.brand-title {
  font-size: 24px;
  font-weight: 400;
  color: #4a5568;
  margin: 0 0 15px 0;
}

.brand-desc {
  font-size: 16px;
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
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  border: 1px solid rgba(64, 158, 255, 0.1);
}

.feature-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(64, 158, 255, 0.15);
  background: rgba(255, 255, 255, 0.9);
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
  background: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  padding: 50px 40px;
  backdrop-filter: blur(20px);
  box-shadow: 0 10px 60px rgba(0, 0, 0, 0.08);
  animation: fadeInRight 0.8s ease-out 0.2s both;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.login-header h2 {
  font-size: 28px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 12px 0;
}

.login-header p {
  font-size: 14px;
  color: #888;
  margin: 0;
}

.login-form {
  width: 100%;
}

.input-wrapper {
  display: flex;
  align-items: center;
  background: #f5f7fa;
  border-radius: 12px;
  padding: 4px 15px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.input-wrapper:focus-within {
  background: #fff;
  border-color: #409EFF;
  box-shadow: 0 0 0 4px rgba(64, 158, 255, 0.1);
}

.input-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 12px;
}

.input-icon {
  width: 20px;
  height: 20px;
  color: #999;
  transition: color 0.3s ease;
}

.input-wrapper:focus-within .input-icon {
  color: #409EFF;
}

.custom-input {
  flex: 1;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  font-size: 15px;
  color: #333;
}

.custom-input :deep(.el-input__wrapper) {
  background: transparent !important;
  box-shadow: none !important;
  padding: 0;
}

.custom-input :deep(.el-input__inner) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0;
  height: 46px;
  line-height: 46px;
  font-size: 15px;
  color: #333;
}

.custom-input :deep(.el-input__inner::placeholder) {
  color: #aaa;
}

.verify-code {
  flex: 0 0 60%;
}

.code-btn {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 10px;
}

.code-img {
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.code-img:hover {
  transform: scale(1.05);
}

.login-btn {
  width: 100%;
  height: 50px;
  font-size: 17px;
  font-weight: 600;
  border-radius: 12px;
  background: linear-gradient(135deg, #409EFF 0%, #66B3FF 100%);
  border: none;
  box-shadow: 0 4px 15px rgba(64, 158, 255, 0.3);
  transition: all 0.3s ease;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(64, 158, 255, 0.4);
}

.login-btn:active {
  transform: translateY(0);
}

.register-link {
  text-align: center;
  margin-top: 25px;
  font-size: 14px;
  color: #666;
}

.register-link a {
  color: #409EFF;
  text-decoration: none;
  font-weight: 500;
  margin-left: 5px;
  transition: color 0.3s ease;
}

.register-link a:hover {
  color: #66B3FF;
}

.login-footer {
  position: fixed;
  bottom: 20px;
  left: 0;
  width: 100%;
  text-align: center;
  z-index: 10;
  color: #999;
  font-size: 13px;
}

:deep(.el-form-item) {
  margin-bottom: 22px;
}

:deep(.el-form-item__error) {
  font-size: 12px;
  padding-top: 4px;
}

@media (max-width: 1200px) {
  .login-left {
    display: none;
  }
  
  .login-content {
    justify-content: center;
  }
  
  .login-right {
    max-width: 100%;
  }
}

/* Option 3: 巨型沉浸式猫 */
.cat-large {
  position: fixed;
  right: -10vw;
  bottom: -10vh;
  width: 60vw;
  height: auto;
  z-index: 5; /* 位于背景之上，内容之下(如果需要)或者之上(如果是主角) */
  pointer-events: none; /* 防止遮挡交互 */
  opacity: 0.9;
  filter: drop-shadow(0 0 20px rgba(161, 140, 209, 0.3));
  animation: floatCat 6s ease-in-out infinite;
}

@keyframes floatCat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.cat-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.eye {
  transform-box: fill-box;
  transform-origin: center;
}

.pupil {
  transition: transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform; // 性能优化
  transform-box: fill-box;
  transform-origin: center;
}
</style>
