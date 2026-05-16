import { createMemoryRouter } from "react-router";
import { RootLayout } from "./root-layout";
import { HomeScreen } from "../screens/home-screen";
import { AboutScreen } from "../screens/about-screen";
import { SettingsScreen } from "../screens/settings-screen";
import { NotFoundScreen } from "../screens/not-found-screen";

export const router = createMemoryRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: "about", element: <AboutScreen /> },
      { path: "settings", element: <SettingsScreen /> },
      { path: "*", element: <NotFoundScreen /> },
    ],
  },
]);
