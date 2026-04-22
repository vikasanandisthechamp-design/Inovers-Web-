"use client";

import * as motion from "motion/react-client";

/**
 * Next.js App Router `template.tsx` mounts a fresh DOM subtree on every
 * route change — ideal for triggering page-enter animations without
 * fighting route-level state.
 */
export default function RouteTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
