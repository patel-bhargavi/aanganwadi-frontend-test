
import { AiOutlineUsergroupAdd, AiOutlineClose, AiOutlineAppstoreAdd } from 'react-icons/ai';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { LuLayoutDashboard } from 'react-icons/lu';

function Sidebar({ openSidebarToggle, OpenSidebar }) {

    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""} >
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <h1 className='icon_header text-white'>AanganWares</h1>
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
                {/* <hr className='text-white'/>
                    <p className='text-white'>Inventories</p>
                <li className='sidebar-list-item'>
                    <a href={`/name-list`}>
                        <AiOutlineUnorderedList className='icon' /> Aanganwadis
                    </a>
                </li> */}
                <hr className='text-white' />
                <p className='text-white m-3'>Users </p>
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
                <hr className='text-white' />
                <p className='text-white m-3'>Category </p>
                <li className='sidebar-list-item'>
                    <a href={`/add-category`}>
                        <AiOutlineAppstoreAdd className='icon' /> Add Category
                    </a>
                </li>
              

            </ul>
        </aside>
    )
}

export default Sidebar