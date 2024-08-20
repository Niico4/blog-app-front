import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AppLayout = () => {
  return (
    <div className="w-full h-screen grid grid-cols-[350px_1fr] gap-4 p-6 bg-[#1a1a1a] ">
      <Sidebar />
      <main className="w-full h-full bg-black flex items-center justify-center rounded-md">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
