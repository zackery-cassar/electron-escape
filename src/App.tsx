import { BrowserRouter, Routes, Route } from "react-router";
import RoomPage from "./app/room/page";
import { Sidebar } from "@/features/navigation";
import WelcomePage from "./app/welcome/page";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-slate-50 flex h-screen">
        <Sidebar />

        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/:id" element={<RoomPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
