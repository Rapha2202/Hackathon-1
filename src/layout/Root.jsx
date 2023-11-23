import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div className="flex h-screen flex-col">
      <Outlet />
    </div>
  );
}

export default Root;
