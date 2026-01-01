/**
 * oRPC Type-safe errors (shared across procedures).
 *
 * 约定：所有错误只包含 code + message，不包含 data。
 */
export const commonErrors = {
  UNAUTHORIZED: {
    message: "Unauthorized",
  },

  FORBIDDEN: {
    message: "Forbidden",
  },

  NOT_FOUND: {
    message: "Not Found",
  },

  RATE_LIMITED: {
    message: "Too Many Requests",
  },
} as const;

export type CommonErrorMap = typeof commonErrors;
