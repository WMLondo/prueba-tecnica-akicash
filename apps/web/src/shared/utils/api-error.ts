export class ApiError extends Error {
  readonly status: number;
  readonly details: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export function getApiErrorMessage(body: unknown, fallback: string): string {
  if (!body || typeof body !== "object" || !("message" in body)) {
    return fallback;
  }

  const message = (body as { message: unknown }).message;

  if (typeof message === "string") {
    return message;
  }

  if (Array.isArray(message)) {
    return message.filter((item) => typeof item === "string").join(", ");
  }

  return fallback;
}
