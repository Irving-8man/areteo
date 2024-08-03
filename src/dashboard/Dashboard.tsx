import SideNav from "../ui/SideNav"
import { Outlet } from 'react-router-dom';


export default function Dashboard() {
  return (

    <main className="flex h-screen flex-row overflow-hidden">
      <div className="flex-none max-w-[200px]">
        <SideNav/>
      </div>

      <div className="flex-grow overflow-y-scroll">
          <Outlet />
      </div>
    </main>

  )
}


