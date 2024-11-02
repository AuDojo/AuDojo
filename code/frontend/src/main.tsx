import { createRoot } from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import Home from "./pages/Home.tsx";
import SortSensei from "./pages/SortSensei.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<SortSensei />}>
      {/* <Route index element={<Home />} /> */}
      {/* <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} /> */}
      <Route path="sortsensei" element={<Home />} />
    </Route>
    
  )
);
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
