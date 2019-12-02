import { LogLevel } from "./interface";

export const shouldLog = (targetLogLevel: LogLevel): boolean => {
  return targetLogLevel <= LogLevel.INFO;
}
