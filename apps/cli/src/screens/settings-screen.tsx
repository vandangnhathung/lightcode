import { TextAttributes } from "@opentui/core";

export function SettingsScreen() {
  return (
    <box flexDirection="column" flexGrow={1} padding={1} gap={1}>
      <text fg="cyan" attributes={TextAttributes.BOLD}>
        Settings
      </text>
      <text>Theme: Dark</text>
      <text>Notifications: Enabled</text>
      <text attributes={TextAttributes.DIM}>(placeholder)</text>
    </box>
  );
}
