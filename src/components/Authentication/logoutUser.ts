import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const logoutUser = async (router: AppRouterInstance, path: string = "/") => {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } catch (err) {
    console.error("Failed to call logout API:", err);
  }
  router.push(path);
  router.refresh();
};
