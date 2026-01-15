# Underwatch WMS 智能仓储管理系统

<p align="center">
  <img alt="Java" src="https://img.shields.io/badge/Java-17-orange.svg" />
  <img alt="SpringBoot" src="https://img.shields.io/badge/SpringBoot-3.2.6-green.svg" />
  <img alt="Vue" src="https://img.shields.io/badge/Vue-3.x-4FC08D.svg" />
  <img alt="Element Plus" src="https://img.shields.io/badge/Element_Plus-2.2-409EFF.svg" />
  <img alt="MySQL" src="https://img.shields.io/badge/MySQL-8.0-blue.svg" />
  <img alt="License" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
</p>

## 项目介绍

**Underwatch WMS** 是一套基于现代化技术栈（Spring Boot 3 + Vue 3）构建的企业级智能仓储管理系统。本项目旨在解决传统仓储管理中数据不透明、作业效率低、库存准确率差等痛点，通过全流程数字化管理，实现从入库、库内作业到出库的闭环管控。

本项目为 **J2EE 框架与应用** 课程设计作品。

### 在线演示

- **演示地址**: [http://121.41.24.35/](http://121.41.24.35/)

---

## 技术栈

### 后端
- **核心框架**: Spring Boot 3.2.6
- **ORM 框架**: MyBatis-Plus 3.5.6
- **权限认证**: Sa-Token 1.37.0 + JWT
- **数据库**: MySQL 8.0
- **缓存**: Redis (Redisson)
- **工具库**: Hutool, Lombok, EasyExcel

### 前端
- **核心框架**: Vue 3
- **构建工具**: Vite 3
- **UI 组件库**: Element Plus
- **状态管理**: Pinia
- **图表库**: ECharts 5
- **HTTP 客户端**: Axios

---

## 核心功能

### 1. 基础数据管理
- **多仓库支持**: 支持仓库、库区、货架、库位四级结构建模。
- **SKU 管理**: 支持多单位、多条码、体积重量管理。
- **批次与效期**: 灵活配置 SKU 是否启用批次管理及保质期管理。

### 2. 入库管理
- **全流程闭环**: 入库单创建 -> 审核 -> 收货(PDA/PC) -> 质检 -> 上架。
- **智能上架**: 基于策略（同品集中、空闲优先等）自动推荐库位。

### 3. 出库管理
- **策略分配**: 支持 FIFO（先进先出）、FEFO（先失效先出）自动分配库存。
- **作业流程**: 拣货任务生成 -> 复核打包 -> 发货交接。

### 4. 库内作业
- **库存查询**: 实时查看物理库存、预占库存、冻结库存。
- **盘点管理**: 支持动盘、全盘及盲盘模式，差异审核后自动调整库存。
- **库存调整**: 移库、冻结、解冻等库内操作。

### 5. 系统管理
- **RBAC 权限**: 细粒度的菜单、按钮及 API 权限控制。
- **操作审计**: 记录关键业务操作日志，确保可追溯。

---

## 目录结构

```text
Underwatch-WMS/
├── backend/                # 后端工程 (Spring Boot)
│   ├── ruoyi-admin-wms/    # Web 启动模块
│   ├── ruoyi-common/       # 通用工具模块
│   ├── ruoyi-modules/      # 业务模块
│   ├── script/sql/         # 数据库脚本
│   └── docs/               # 项目文档与设计图
├── vue/                    # 前端工程 (Vue 3 + Vite)
│   ├── src/                # 源代码
│   ├── .env.production     # 生产环境配置
│   └── package.json        # 前端依赖
└── README.md               # 项目说明文档
```

---

## 快速开始

### 环境要求
- JDK >= 17
- MySQL >= 8.0
- Redis >= 5.0
- Node.js >= 16

### 1. 后端启动
1. 克隆仓库到本地。
2. 创建数据库 `ry-wms` 并导入 `backend/script/sql/ry-vue.sql` 与 `backend/script/sql/wms.sql`。
3. 修改 `backend/ruoyi-admin-wms/src/main/resources/application-druid.yml` 中的数据库连接信息。
4. 修改 `backend/ruoyi-admin-wms/src/main/resources/application.yml` 中的 Redis 配置。
5. 运行 `ruoyi-admin-wms` 模块下的 `RuoYiApplication.java` 启动服务。

### 2. 前端启动
```bash
cd vue
npm install
npm run dev
```
访问 `http://localhost:80` 即可看到登录页面。

---

## 系统截图

> 更多截图请查看 `backend/docs/` 目录

### 首页与数据看板
![首页](backend/docs/首页.png)

### 入库管理
![入库单](backend/docs/入库单.jpg)

### 库存查询
![库存明细](backend/docs/库存明细.jpg)

---

## 作者

- **浦颖昊** (121052023087) - 全栈开发 (前端/后端/仓库/库存模块)
- **吴嘉胜** (121052023090) - 全栈开发 (前端/后端/客户/系统模块)

---

## 开源协议

本项目采用 [MIT](LICENSE) 协议。

---

## 文档与过程记录（6A）

为便于复现与验收，本仓库将 README 作为唯一入口文档，统一记录项目对齐、任务拆分与验收结论。

### 1) 对齐阶段（ALIGNMENT）

- **项目名称**：Underwatch WMS
- **项目路径**：`F:\wms\WMS\第25组 121052023087_浦颖昊_121052023090_吴嘉胜`
- **项目类型**：前后端分离全栈 Web 应用（Java Spring Boot + Vue 3）
- **项目性质**：课程设计（J2EE 框架与应用）
- **已部署地址**：`http://121.41.24.35/`
- **目标**：生成可直接用于 GitHub 的 `README.md`（含技术栈、功能、启动与演示信息）
- **截图策略**：避免本机绝对路径，统一使用仓库相对路径（如 `backend/docs/`）
- **数据库脚本**：位于 `backend/script/sql`（`ry-vue.sql`、`wms.sql`）

### 2) 原子任务（TASK）

1. 分析项目上下文：确认技术栈、功能范围与部署信息（已完成）
2. 起草 README 结构：按 GitHub 阅读习惯组织章节（已完成）
3. 生成根目录 README：写入并可直接上传使用（已完成）

### 3) 验收记录（ACCEPTANCE）

- 已包含：部署地址、作者信息、技术栈、核心功能、快速开始
- 已验证：截图使用相对路径指向 `backend/docs/`
# -UnderwatchWMS
