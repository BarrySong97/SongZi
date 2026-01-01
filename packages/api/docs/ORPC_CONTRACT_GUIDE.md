## oRPC：Contract-first 结构说明（本项目约定）

### (a) 怎么定义一个接口（API 接口 / Procedure）

**目标**：先定义“这个接口长什么样”（输入/输出校验、可选的 route/meta/errors），不写实现逻辑。

- **Contract 定义位置**：`packages/api/src/contracts/app.ts`
- **Schema 定义位置**：`packages/api/src/schemas/*.ts`

示例（节选自 `appContract` 的风格）：

- `healthCheck`：只有 output 校验
- `echo`：有 input + output 校验

### (b) 怎么定义一个类型（TypeScript 类型）

**目标**：类型不要和 schema 混在同一个文件里（便于分层、减少循环依赖、也更符合“契约/实现”拆分）。

- **Type 定义位置**：`packages/api/src/types/*.ts`
- **约定**：类型从 schema 推导（`z.infer<...>`），避免重复维护。

例子：

- `packages/api/src/types/echo.ts` 导出 `EchoInput` / `EchoOutput`
- `packages/api/src/types/health-check.ts` 导出 `HealthCheckOutput`

### (c) 它们分别定义在哪些文件里面

- **Schema（Zod 校验）**：

  - `packages/api/src/schemas/health-check.ts`
  - `packages/api/src/schemas/echo.ts`
  - `packages/api/src/schemas/private-data.ts`

- **Type（TS 类型）**：

  - `packages/api/src/types/health-check.ts`
  - `packages/api/src/types/echo.ts`
  - `packages/api/src/types/private-data.ts`

- **Contract（只描述接口，不写 handler）**：

  - `packages/api/src/contracts/app.ts`

- **Implement（实现层：把 handler 挂到 contract 上）**：
  - `packages/api/src/routers/app.ts`
  - 入口 re-export：`packages/api/src/routers/index.ts`（保持外部 import 路径稳定）
