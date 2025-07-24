// src/utils/errorHandler.ts
export function errorHandler(error: any) {
  console.log("error", error);
  if (error == null) {
    return "unknown error";
  }

  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return JSON.stringify(error);
}
