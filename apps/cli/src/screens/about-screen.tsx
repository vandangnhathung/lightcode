import { TextAttributes } from "@opentui/core";

export function AboutScreen() {
  return (
    <box flexDirection="column" flexGrow={1} padding={1} gap={1}>
      <text fg="cyan" attributes={TextAttributes.BOLD}>
        About
      </text>
      <text>lightcode CLI — terminal app built with OpenTUI.</text>
    </box>
  );
}
