import { TextAttributes } from "@opentui/core";

export function NotFoundScreen() {
  return (
    <box alignItems="center" justifyContent="center" flexGrow={1}>
      <box flexDirection="column" alignItems="center">
        <text fg="red" attributes={TextAttributes.BOLD}>
          Screen Not Found
        </text>
        <text attributes={TextAttributes.DIM}>route does not exist</text>
      </box>
    </box>
  );
}
