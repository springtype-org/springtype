import { st } from "../st";
import { LogLevel } from "./interface";
import { shouldLog } from "./should-log";

if (!st.info) {
  st.info = st.log = st.debug = (...args: Array<any>) => {
    if (process.env.NODE_ENV != "production" && shouldLog(LogLevel.INFO)) {
      console.info("ℹ️", ...args);
    }
  };

  st.warn = (...args: Array<any>) => {
    if (process.env.NODE_ENV != "production" && shouldLog(LogLevel.WARN)) {
      console.warn("🔥", ...args);
    }
  };

  st.error = (...args: Array<any>) => {
    if (process.env.NODE_ENV != "production" && shouldLog(LogLevel.ERROR)) {
      console.error("💣", ...args);
    }
  };
} else {
  if (process.env.NODE_ENV === 'development') {
    st.warn('Module log is loaded twice. Check for duplicate famework import!');
  }
}

