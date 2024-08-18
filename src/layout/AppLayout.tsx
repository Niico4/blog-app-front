import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="w-full h-screen grid grid-cols-[350px_1fr] gap-4 p-6 bg-[#000] ">
      <Outlet />
    </div>
  );
};

export default AppLayout;
