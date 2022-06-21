import { keys } from "./keys";
export const unauthorization = () => {
  localStorage.removeItem(keys.token);
  window.location.href = "http://localhost:3001";
};
