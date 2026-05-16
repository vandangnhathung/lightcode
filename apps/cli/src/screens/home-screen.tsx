import { Banner } from "../components/banner";
import { PromptInput } from "../components/prompt-input";

export function HomeScreen() {
  return (
    <box
      flexGrow={1}
      flexDirection="column"
      paddingTop={1}
      paddingBottom={1}
      paddingLeft={2}
      paddingRight={2}
      gap={2}
    >
      <Banner />
      <box flexGrow={1} />
      <PromptInput />
    </box>
  );
}
