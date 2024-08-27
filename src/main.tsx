import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Keyboard from "./components/keyboard.tsx";
import Gameboy from "./components/gameboy.tsx";
import Rubiks from "./components/rubiks.tsx";
import Disney from "./components/disney.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/keyboard",
    element: <Keyboard />,
  },
  {
    path: "/gameboy",
    element: <Gameboy />,
  },
  {
    path: "/rubiks",
    element: <Rubiks />,
  },
  {
    path: "/disney",
    element: <Disney />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
