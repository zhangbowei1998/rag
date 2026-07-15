# RAG SDK 交接快照（Core v1）

## 1. 目的

本文件用于后续 AI/开发者快速接手当前仓库状态，避免重复探索与误改。

## 2. 当前里程碑

- Monorepo 初始化完成（pnpm workspace）。
- `@rag-sdk/core` 完成 v1 契约层实现。
- `@rag-sdk/core` 已切换为 `dist` 导出。
- `@rag-sdk/core` 已具备 build/typecheck/test/demo 最小验证闭环。

## 3. Core 当前能力

`packages/core/src` 已包含：

- `spec`: Query/Chunk/RAGResponse 的 Zod schema
- `types`: 基于 `z.infer` 的类型导出
- `interfaces`: Retriever/Generator 接口定义
- `errors`: ValidationError/RetrievalError/GenerationError
- `pipeline`: RAGPipeline 类型抽象
- `demo`: 最小示例脚本

对应测试位于：

- `packages/core/__tests__/schema.spec.ts`
- `packages/core/__tests__/errors.spec.ts`
- `packages/core/__tests__/exports.spec.ts`

## 4. 关键约束

- `core` 只提供共享契约，不承载业务实现。
- `core` 源码只在 `src`，构建产物只在 `dist`。
- `core` 对外暴露必须经 `src/index.ts` 聚合，并由 `package.json` 导出到 `dist`。

## 5. 关键命令（当前可用）

在仓库根目录执行：

```bash
npx -y pnpm@9.15.9 install
npx -y pnpm@9.15.9 run build
npx -y pnpm@9.15.9 run typecheck
npx -y pnpm@9.15.9 --filter @rag-sdk/core test
npx -y pnpm@9.15.9 run verify
```

## 6. 为什么使用 pnpm@9

当前机器环境为 Node 24，本地 pnpm 8 与 registry 请求存在兼容问题。使用 `npx -y pnpm@9.15.9` 可稳定执行安装与验证。

## 7. 后续开发优先级建议

1. 在 `runtime` 消费 `core` 契约，建立最小联调用例。
2. 补充 integration/smoke 测试骨架并接入根脚本。
3. 将 `dist` 导出策略逐步推广到其它进入实现阶段的包。

## 8. 关联文档

- `docs/context/ai-handoff.md`
- `docs/context/package-install-policy.md`
- `docs/context/verification-policy.md`
- `.github/copilot-instructions.md`
