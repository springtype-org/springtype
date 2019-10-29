import { st } from "../st";
import { LogLevel } from "./interface";

export const shouldLog = (targetLogLevel: LogLevel): boolean => {
  return targetLogLevel <= st.options.core.logLevel;
}
