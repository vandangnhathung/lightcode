import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { RouterProvider } from "react-router";
import { router } from "./app/router";

const renderer = await createCliRenderer();
createRoot(renderer).render(<RouterProvider router={router} />);
