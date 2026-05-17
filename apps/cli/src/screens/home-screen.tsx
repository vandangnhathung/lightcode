import { useEffect, useState } from "react";
import { Banner } from "../components/banner";
import { PromptInput } from "../components/prompt-input";
import { client } from "../lib/client";

export function HomeScreen() {
  const [serverStatus, setServerStatus] = useState("checking");

  useEffect(() => {
    let cancelled = false;

    async function checkServer() {
      try {
        const res = await client.health.$get();
        const data = await res.json();
        if (!cancelled) setServerStatus(data.status);
      } catch {
        if (!cancelled) setServerStatus("offline");
      }
    }

    void checkServer();

    return () => {
      cancelled = true;
    };
  }, []);

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
      <text>server: {serverStatus}</text>
      <box flexGrow={1} />
      <PromptInput />
    </box>
  );
}
