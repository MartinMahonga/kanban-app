import Navbar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/sidebar";

const Layout = ({children}) => {
  return (
    <div className="w-screen h-screen">
      <Navbar/>
      <Sidebar/>
      <div className="md:pl-64 pl-14 pr-5 pt-16 w-full h-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export default Layout;