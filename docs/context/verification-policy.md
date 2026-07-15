# Monorepo 验证体系规范（AI 执行版）

## 1. 目标

建立统一、可执行、可渐进升级的验证体系，保障 RAG SDK 在多包架构下的：

- 类型安全
- 行为正确
- 包级自治
- 跨包协同稳定
- 回归可控

## 2. 适用范围

- 适用于当前仓库全部 `packages/*` 子包。
- 适用于仓库根目录下的集成与冒烟验证。
- AI 在实现、重构、补测试、加依赖时均必须遵循。

## 3. 分阶段执行策略

### 阶段 A（当前阶段：骨架到首批功能）

目标：先建立最小可执行验证闭环。

必须满足（MUST）：

- Type 验证可运行（至少对已配置的包生效）。
- 新增功能代码必须带最小单元测试或最小 demo（二选一，优先单测）。
- 关键路径改动后，必须执行一次仓库级冒烟验证（如已配置）。

建议（SHOULD）：

- 对外部输入边界使用 Zod 校验。
- 每个新增功能包补齐 `__tests__/` 或 `demo/` 目录之一。

### 阶段 B（功能迭代稳定期）

目标：形成包级验证基线。

必须满足（MUST）：

- 每个活跃开发包具备 `unit test`。
- 每个活跃开发包提供最小可运行 demo。
- 跨包关键链路具备 integration 用例。

### 阶段 C（发布前）

目标：建立发布门禁。

必须满足（MUST）：

- 全量 typecheck 通过。
- unit + integration + smoke 全通过。
- 覆盖率达到发布阈值（见第 8 节）。

## 4. 验证分层定义

1. Type 验证：TypeScript 静态检查。
2. Spec 验证：Zod 运行时 Schema 校验（重点在外部输入/跨包边界）。
3. Unit Test：包内最小行为单测。
4. Demo 验证：包级最小可运行示例。
5. Integration：跨包协同链路验证。
6. Smoke：仓库级最小闭环验证。

## 5. 边界与职责

- 验证体系：保证“代码正确性 + 系统可运行性”。
- 评测体系：衡量“效果优劣”（如 BLEU/MRR/业务指标）。
- 禁止将评测指标计算逻辑耦合到 `runtime` 主流程；评测逻辑应放在 `eval` 包。

## 6. 目录建议（目标态）

```text
packages/
  <pkg>/
    src/
    __tests__/   # 单元测试（建议）
    demo/        # 最小示例（建议）

tests/
  integration/   # 跨包集成
  smoke/         # 仓库级冒烟
```

说明：当前仓库尚未全部进入目标态，可按阶段 A 逐步补齐。

## 7. 脚本契约（Root 与 Package）

为避免 AI 生成不一致脚本，统一约定如下。

### 7.1 Root 脚本（推荐目标）

```json
{
  "scripts": {
    "build": "pnpm --filter @rag-sdk/core build",
    "typecheck": "pnpm --filter @rag-sdk/core typecheck",
    "test": "pnpm --filter @rag-sdk/core test",
    "verify": "pnpm run build && pnpm run typecheck && pnpm run test && pnpm --filter @rag-sdk/core demo"
  }
}
```

说明：上述为当前仓库已落地的最小基线；后续可在此基础上扩展 integration/smoke。

### 7.2 Package 脚本（建议契约）

每个活跃开发包建议逐步具备：

- `typecheck`
- `test`
- `demo`

## 8. 覆盖率阈值（建议基线）

在未单独声明前，默认采用：

- 核心包（`core`、`runtime`）：行覆盖率 >= 80%
- 其它包：行覆盖率 >= 70%

若当前阶段尚未具备覆盖率统计能力，可在阶段 A 暂不强制，但发布前必须启用。

## 9. AI 执行清单（每次改动前后）

改动前：

- 判断本次属于哪个阶段（A/B/C）。
- 判断是否涉及跨包边界或外部输入。
- 判断需补 unit、demo、integration 还是 smoke。

改动后：

- 执行对应阶段要求的验证命令。
- 失败时优先修复，再更新文档与脚本。
- 若新增验证规则，必须同步更新本文件与交接文档。

## 10. 与其它规范的关系

- 依赖安装规范：`docs/context/package-install-policy.md`
- AI 交接总览：`docs/context/ai-handoff.md`
- 仓库执行指令：`.github/copilot-instructions.md`

本文件用于指导 AI 在后续开发中的验证行为，优先级高于临时口头约定。
