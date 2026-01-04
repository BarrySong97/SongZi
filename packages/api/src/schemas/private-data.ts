import { z } from "zod";

// 注意：user 的具体结构来自 better-auth session，作为 API 边界通常不强约束结构，
// 这里用 unknown + optional 既能校验整体 shape，也避免在 schema 层耦合 auth 的复杂类型。
export const privateDataOutputSchema = z.object({
	message: z.string(),
	user: z.unknown().optional(),
});
