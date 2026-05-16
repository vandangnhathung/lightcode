import { TextAttributes } from "@opentui/core";
import { useKeyboard } from "@opentui/react";
import { Outlet, useLocation, useNavigate } from "react-router";

const NAV_KEYS: Record<string, string> = {
  h: "/",
  a: "/about",
  s: "/settings",
};

export function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  useKeyboard((key) => {
    if (!key.ctrl) return;
    const target = NAV_KEYS[key.name];
    if (target && target !== location.pathname) navigate(target);
  });

  return (
    <box flexDirection="column" flexGrow={1}>
      <box
        flexDirection="row"
        justifyContent="space-between"
        paddingLeft={1}
        paddingRight={1}
        borderStyle="single"
        border={["bottom"]}
      >
        <text attributes={TextAttributes.BOLD}>lightcode</text>
        <text attributes={TextAttributes.DIM}>
          ctrl+h home · ctrl+a about · ctrl+s settings
        </text>
        <text attributes={TextAttributes.DIM}>{location.pathname}</text>
      </box>

      <box flexGrow={1}>
        <Outlet />
      </box>
    </box>
  );
}
