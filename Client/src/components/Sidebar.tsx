import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className='sidebar'>
      <div className='sidebar-logo'>Logo</div>
      <ul className='sidebar-links'>
        <li><button className='sidebar-btn' onClick={() => navigate("/")}>Dashboard</button></li>
        <li><button className='sidebar-btn' onClick={() => navigate("/files")}>Files</button></li>
        <li><button className='sidebar-btn' onClick={() => navigate("/shared-files")}>Shared Files</button></li>
        <li><button className='sidebar-btn' onClick={() => navigate("/settings")}>Settings</button></li>
      </ul>
    </aside>
  );
};

export default Sidebar;