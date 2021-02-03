import { I$st } from './st/interface/i$st';

declare global {
  interface Window {
    $st: I$st;
  }
}
