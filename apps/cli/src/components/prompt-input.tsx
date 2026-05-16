import { useRef, useState } from "react";
import { TextAttributes } from "@opentui/core";
import type { KeyBinding, TextareaRenderable } from "@opentui/core";
import { useNavigate } from "react-router";

const SUBMIT_BINDINGS: KeyBinding[] = [
  { name: "return", action: "submit" },
  { name: "linefeed", action: "submit" },
  { name: "return", shift: true, action: "newline" },
];

const ROUTE_ALIASES: Record<string, string> = {
  "/home": "/",
};

export function PromptInput() {
  const ref = useRef<TextareaRenderable>(null);
  const [, setValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const node = ref.current;
    if (!node) return;
    const text = node.plainText.trim();
    node.clear();
    setValue("");
    if (!text.startsWith("/")) return;
    const lower = text.toLowerCase();
    navigate(ROUTE_ALIASES[lower] ?? lower);
  };

  return (
    <box flexDirection="column" gap={1}>
      <box
        border
        borderColor="#3a3a3a"
        paddingLeft={1}
        paddingRight={1}
        flexDirection="row"
        alignItems="flex-start"
      >
        <text fg="#7a7a7a">{"> "}</text>
        <textarea
          ref={ref}
          initialValue=""
          keyBindings={SUBMIT_BINDINGS}
          onContentChange={() =>
            setValue(ref.current?.plainText ?? "")
          }
          onSubmit={handleSubmit}
          placeholder="Ask anything, or type / for commands"
          height={3}
          flexGrow={1}
          focused
        />
      </box>
      <box flexDirection="row" justifyContent="space-between">
        <text attributes={TextAttributes.DIM}>
          enter send · shift+enter newline · /home /about /settings
        </text>
        <text attributes={TextAttributes.DIM}>ctrl+c quit</text>
      </box>
    </box>
  );
}
