import { TextAttributes } from "@opentui/core";
import { APP_NAME, greet } from "@lightcode/shared";

export function Banner() {
  return (
    <box flexDirection="column" gap={1}>
      <ascii-font font="tiny" text={APP_NAME} />
      <text attributes={TextAttributes.DIM}>
        {greet("you").message}
      </text>
    </box>
  );
}
