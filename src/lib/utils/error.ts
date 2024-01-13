import { fail } from "./toasts";

export function throwError(msg: string): never {
  throw new Error(msg);
}

type ErrorDetails = {
  title: string;
  msg: string;
  details?: Record<string, unknown>;
};

function failHandler(errorDetails: ErrorDetails): void {
  let message = errorDetails.msg;
  if (errorDetails.details) {
    message += `\nError Details:\n${Object.entries(errorDetails.details)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n")}`;
  }

  fail({ msg: message, title: errorDetails.title });
}

function handleGlobalError(
  message: string | Event,
  source?: string | undefined,
  lineno?: number | undefined,
  colno?: number | undefined,
  error?: Error | undefined,
): void {
  const errorDetails: ErrorDetails = {
    title: "Global Error",
    msg: "An unexpected error occurred. Please retry.",
  };

  if (error) {
    errorDetails.details = {
      message,
      source,
      lineno,
      colno,
      error: error?.stack || error?.message || String(error),
    };
  }

  failHandler(errorDetails);
}

function handlePromiseRejection(event: PromiseRejectionEvent): void {
  const error = event?.reason as Error;
  const errorDetails: ErrorDetails = {
    title: "Global Error",
    msg: "An unexpected error occurred. Please retry.",
  };

  if (error) {
    errorDetails.details = {
      message: error?.message || String(error),
      stack: error?.stack || "No stack trace available.",
    };

    // HeadlessUI combobox error with no consequences (and no way to avoid it...)
    if (
      typeof errorDetails.details.message === "string" &&
      errorDetails.details.message.includes("e.items[e.active]")
    )
      return;
  }

  failHandler(errorDetails);
}

export function setupErrorHandlers() {
  window.onerror = handleGlobalError;
  window.onunhandledrejection = handlePromiseRejection;
}
