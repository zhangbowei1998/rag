# VS Code Copilot 使用说明

本仓库使用 VS Code 的 GitHub Copilot 指令文件。

- 当前阶段：项目初始化已完成，后续开发请按任务需求推进。
- 优先进行最小化、渐进式修改，并保持与现有项目风格一致。
- 避免添加无关依赖或无关目录；仅在需求明确时引入新依赖。
- 调整工作区结构时，保持 packages 下各目录为独立 package。
- 每个 package 入口约定为 src/index.ts，并通过 package.json 的 exports 暴露。

该文件用于替代原先的 .cursorrules。
