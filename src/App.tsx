import RoomPage from "./app/room/page";
import Sidebar from "./components/layout/sidebar/sidebar";

function App() {
  return (
    <div className="bg-slate-50 flex h-screen">
        <Sidebar />
        <RoomPage />
      </div>
  )
}

export default App;
