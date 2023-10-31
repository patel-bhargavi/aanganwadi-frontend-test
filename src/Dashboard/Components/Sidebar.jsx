import {
    AiOutlineUsergroupAdd,
    AiOutlineClose,
    AiOutlineAppstoreAdd,
  } from "react-icons/ai";
  import { MdOutlineManageAccounts } from "react-icons/md";
  import { LuLayoutDashboard } from "react-icons/lu";
  // import {CgProfile} from 'react-icons/cg'
  import { BiLogOut } from "react-icons/bi";
  import { useNavigate } from "react-router-dom";
  import { toast } from "react-toastify";
  import { Button } from "react-bootstrap";
  
  // ... (import statements)
  
  function Sidebar({ openSidebarToggle, OpenSidebar, setIsLoggedIn }) {
    const navigate = useNavigate();
    const handleLogout = async (e) => {
      localStorage.removeItem("token");
      localStorage.removeItem('profile');
      setIsLoggedIn(false);
      navigate("/");
      toast.success("Logout Successfully");
    };
  
    const profileData = JSON.parse(localStorage.getItem("profile"));
    const userRole = profileData.users_role_id;
  
    return (
      <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
        <div className="sidebar-title">
          <div className="sidebar-brand">
            <h1 className="icon_header">AanganSeva</h1>
          </div>
          <span className="icon close_icon" onClick={OpenSidebar}>
            <AiOutlineClose color="#D3D3D3" />
          </span>
        </div>
  
        <ul className="sidebar-list">
          <li className="sidebar-list-item" onClick={() => navigate("/dashboard")}>
            <LuLayoutDashboard className="icon" /> Dashboard
          </li>
          {userRole === "Admin" && (
            <>
              <hr className="" />
  
              <p className="m-3 fw-bold">Users</p>
              <li className="sidebar-list-item" onClick={() => navigate("/add-user")}>
                <AiOutlineUsergroupAdd className="icon" /> Add User
              </li>
              <li className="sidebar-list-item" onClick={() => navigate("/manage-users")}>
                <MdOutlineManageAccounts className="icon" /> Manage Users
              </li>
            </>
          )}
          <hr className="" />
          <p className="m-3 fw-bold">Category</p>
          <li className="sidebar-list-item" onClick={() => navigate("/add-category")}>
            <AiOutlineAppstoreAdd className="icon" /> Add Category
          </li>
          <hr className="" />
          <li className="p-3 text-white">
            <Button onClick={handleLogout} className="btn btn-danger w-100">
              <BiLogOut className="icon" />
              Logout
            </Button>
          </li>
        </ul>
      </aside>
    );
  }
  
  export default Sidebar;
  