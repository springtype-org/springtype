import { st } from "../st";

if (!st.info) {
  st.info = (...args: Array<any>) => {
    if (process.env.NODE_ENV != "production") {
      console.info("ℹ️", ...args);
    }
  };

  st.warn = (...args: Array<any>) => {
    if (process.env.NODE_ENV != "production") {
      console.warn("🔥", ...args);
    }
  };

  st.error = (...args: Array<any>) => {
    if (process.env.NODE_ENV != "production") {
      console.error("💣", ...args);
    }
  };
}
