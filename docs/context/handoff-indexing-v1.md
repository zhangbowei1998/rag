# RAG SDK 交接快照（Indexing v1）

## 1. 目的

本文件用于后续 AI/开发者快速接手 indexing 当前实现状态，避免重复探索与偏航实现。

## 2. 当前里程碑

- `@rag-sdk/indexing` 完成 v1 MVP。
- 目录结构已收敛到 `src`，并切换为 `dist` 导出。
- 已实现统一入口 `runIndexing`。
- 已实现默认组件：`MarkdownLoader`、`SimpleChunker`、`MockEmbedder`、`MemoryVectorStore`。
- 已具备 build/typecheck/test/demo 最小验证闭环。

## 3. 包职责边界（已落地）

- indexing 负责离线索引流程编排，不绑定云厂商 SDK。
- indexing 复用 `@rag-sdk/core` 契约（包含 Chunk/Document/Vector）。
- indexing 不实现 runtime 检索逻辑，不承载具体云服务 adapter。

## 4. 当前目录（核心）

- `src/loaders/`
- `src/transformers/`
- `src/chunkers/`
- `src/embedders/`
- `src/stores/`
- `src/pipeline/`
- `src/types/`
- `src/defaults/`
- `src/errors/`
- `src/index.ts`

命名约定：目录复数、文件单数。

## 5. runIndexing 统一流程

流程固定为：

- load
- transform（可选）
- filter（可选）
- chunk
- metadata build（可选）
- embed
- store
- collect result

默认策略：

- 未传 `chunker` 使用 `SimpleChunker`
- 未传 `shouldIndex` 默认全量通过
- 未传 `metadataBuilder` 默认继承 `doc.metadata` 并追加 `documentId`

错误策略：

- 默认 `fail-fast`
- 支持 `continue-on-error`

## 6. 结果口径（IndexingResult）

- documentsTotal
- documentsIndexed
- chunksTotal
- vectorsTotal
- skippedDocuments
- failedDocuments

## 7. 关键命令（当前可用）

在仓库根目录执行：

```bash
npx -y pnpm@9.15.9 install
npx -y pnpm@9.15.9 --filter @rag-sdk/indexing build
npx -y pnpm@9.15.9 --filter @rag-sdk/indexing typecheck
npx -y pnpm@9.15.9 --filter @rag-sdk/indexing test
npx -y pnpm@9.15.9 --filter @rag-sdk/indexing demo
npx -y pnpm@9.15.9 run verify
```

## 8. 已有验证资产

- 单测目录：`packages/indexing/__tests__/`
- demo 脚本：`packages/indexing/demo/run-indexing.ts`

## 9. 后续开发优先级建议

1. 补充 runtime 消费 indexing 产物的轻量 integration。
2. 增加 smoke 场景与失败路径覆盖（store/embed 失败）。
3. 仅在下一阶段引入并发、重试、增量索引（当前 MVP 不做）。

## 10. 关联文档

- `docs/context/ai-handoff.md`
- `docs/context/package-install-policy.md`
- `docs/context/verification-policy.md`
- `docs/context/handoff-core-v1.md`
- `.github/copilot-instructions.md`
