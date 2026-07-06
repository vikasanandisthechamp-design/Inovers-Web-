"use client";

import { useEffect, useRef } from "react";
import { track, type AcceleratorEvent } from "@/lib/accelerator/analytics";

/** Fires a single analytics event when the page mounts. */
export function PageView({
  event,
  page,
}: {
  event: AcceleratorEvent;
  page: string;
}) {
  const fired = useRef(false);
  useEffect(() => {
    if (!fired.current) {
      fired.current = true;
      track(event, { page });
    }
  }, [event, page]);
  return null;
}
