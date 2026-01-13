import Sidebar from "./Sidebar";

const Layout = ({ children } : any) => {
  return (
    <div className='main'>
      <Sidebar />
      <div className='content-area'>
        {children}
      </div>
    </div>
  );
};

export default Layout;