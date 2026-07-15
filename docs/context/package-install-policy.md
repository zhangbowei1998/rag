# Monorepo 安装包策略（AI 执行规范）

## 1. 目的

统一 Monorepo 下依赖安装位置与声明方式，避免隐式依赖、版本漂移与发布后不可用问题。

## 2. 总原则

遵循“谁使用，谁声明”。

- 开发工具依赖：根目录统一管理。
- 运行时依赖：安装在实际使用的子包内。
- 每个 package 的 package.json 必须能独立描述其运行依赖。

## 3. 根目录安装范围

应安装在根目录的依赖（通常为 devDependencies）：

- TypeScript（统一编译版本）
- 代码质量与测试工具（如 eslint、prettier、vitest）
- 构建工具（如 tsup）
- Workspace 级管理工具

示例：

```bash
pnpm add typescript -w -D
```

## 4. 子包安装范围

应安装在子包 package.json 的依赖：

- 运行时库（如 zod、openai、lodash-es）
- 仅该包使用的运行时代码依赖

原则：

- 即使多个子包都使用同一运行时依赖，也要在各自子包显式声明。
- 不允许依赖其它包“顺带安装”的隐式依赖。

## 5. peerDependencies 判定规则

当依赖需要与宿主保持同一实例或版本强耦合时，优先使用 peerDependencies。

- 典型场景：插件型包、框架生态强绑定包。
- 若只在包内部使用且不要求宿主提供，则放 dependencies。

## 6. 版本一致性策略

在不破坏“显式声明”的前提下做统一版本管理：

- 子包继续显式声明自身依赖。
- 根目录可使用 pnpm overrides（后续需要时启用）统一版本。

## 7. 测试依赖放置规则

- 全仓通用的测试工具：放根目录 devDependencies。
- 仅单个子包使用的测试库：放该子包 devDependencies。

## 8. AI 执行检查清单

AI 在安装任何依赖前必须自检：

- 这是开发工具还是运行时依赖？
- 依赖是否应由具体子包独立发布时携带？
- 是否需要 peerDependencies 而非 dependencies？
- 是否违反“谁使用，谁声明”？
- 是否需要同步更新文档与 package.json 导出约定？

## 9. 适用范围

本规范适用于当前仓库所有 packages/* 子包与后续新增子包。
