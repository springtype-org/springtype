import { st } from "../../../src/core";

export interface AppTheme {
  primary: {
    base: string;
    shade: string;
    tint: string;
  }
}

st.tss.setTheme({
  primary: {
    base: '#1a6da9',
    shade: '#1d679c',
    tint: '#1f83ca'
  }
});
