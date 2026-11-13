export const VIEWER_PAGE_KEYS = [
  "/",
  "/clarity-session",
  "/full-program",
  "/learn-with-mentorship",
  "/programs/incubation",
  "/programs/accelerator",
  "/programs/scale-up",
];

export function isViewerPage(pathname) {
  return VIEWER_PAGE_KEYS.includes(pathname);
}
