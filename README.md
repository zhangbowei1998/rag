# RAG SDK Monorepo

## 项目简介

这是一个基于 `pnpm workspace` 的 RAG SDK Monorepo 工程骨架。
当前阶段已完成初始化与目录搭建，不包含实际业务实现代码。

## 技术栈

- Node.js
- pnpm workspace
- TypeScript（入口占位）

## 目录结构

```text
.
├─ packages/
│  ├─ core/
│  ├─ runtime/
│  ├─ indexing/
│  ├─ adapters/
│  ├─ observability/
│  ├─ eval/
│  └─ utils/
├─ docs/
├─ package.json
├─ pnpm-workspace.yaml
└─ pnpm-lock.yaml
```

> 说明：每个 `packages/*` 都是独立 package，已包含 `package.json` 与 `src/index.ts` 占位入口。

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 查看 workspace 包

```bash
pnpm -r list --depth -1
```

## Package 约定

每个 package 统一遵循：

- 入口文件：`src/index.ts`
- 导出配置：`package.json` 中 `main/types/exports` 指向 `./src/index.ts`
- 当前入口仅占位：`export {};`

## 文档与交接

- AI 交接文档：`docs/context/ai-handoff.md`
- Copilot 仓库指令：`.github/copilot-instructions.md`

## 当前状态

- 已初始化 Git 仓库
- 已完成 `pnpm install`
- 已完成 Monorepo 目录与包骨架
- 尚未实现业务逻辑

## 后续建议

- 按 package 分层逐步补充接口与实现
- 增加统一的 TypeScript 配置与构建脚本
- 增加测试、lint、格式化与 CI
