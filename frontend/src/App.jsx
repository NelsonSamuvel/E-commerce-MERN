import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="py-2">
        <Outlet />
      </main>
    </>
  );
}
