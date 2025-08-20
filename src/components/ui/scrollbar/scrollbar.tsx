import type React from "react";
import { Scrollbar as ReactScrollbar } from "react-scrollbars-custom";

export function Scrollbar({ children }: { children?: React.ReactNode }) {
  return (
    <ReactScrollbar
      trackYProps={{
        style: { background: "transparent", width: 3, marginRight: 5 },
      }}
      thumbYProps={{
        style: { background: "oklch(70.7% 0.022 261.325)" },
      }}
    >
      {children}
    </ReactScrollbar>
  );
}
