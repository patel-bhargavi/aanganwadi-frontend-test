
import { AiOutlineUsergroupAdd, AiOutlineClose, AiOutlineAppstoreAdd } from 'react-icons/ai';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { LuLayoutDashboard } from 'react-icons/lu';
// import {CgProfile} from 'react-icons/cg'
import {BiLogOut} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

function Sidebar({ openSidebarToggle, OpenSidebar , setIsLoggedIn }) {
    const navigate = useNavigate();
    const handleLogout = async (e) => { 
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
        toast.success('Logout Sucessfully')
      }

    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""} >
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <h1 className='icon_header'>Aanganwadi</h1>
                    {/* <h1 className='icon_header text-white'>AanganMate</h1> */}
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}><AiOutlineClose color="#D3D3D3" /></span>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <a href={`/dashboard`}>
                        <LuLayoutDashboard className='icon' /> Dashboard
                    </a>
                </li>
              
                <hr className='' />
                <p className='m-3 fw-bold'>Users </p>
                <li className='sidebar-list-item'>
                    <a href={`/add-user`}>
                        <AiOutlineUsergroupAdd className='icon' /> Add User
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href={`/manage-users`}>
                        <MdOutlineManageAccounts className='icon' /> Manage Users
                    </a>
                </li>
                <hr className='' />
                <p className=' m-3 fw-bold'>Category </p>
                <li className='sidebar-list-item'>
                    <a href={`/add-category`}>
                        <AiOutlineAppstoreAdd className='icon' /> Add Category
                    </a>
                </li>
                <hr className='' />
                 
                
                <li className='sidebar-list-item bg-danger text-white'>
                    {/* <a href={`/`} className='text-white'> */}
                        <BiLogOut className='icon' onClick={handleLogout}  />Logout
                    {/* </a> */}
                </li>
              

            </ul>
        </aside>
    )
}

export default Sidebar