
import './App.css';
import { Route, Routes } from "react-router-dom";
import Dashboard from './Dashboard/Pages/Dashboard'
import NameList from './Dashboard/Pages/NameList';
import React, { useState } from "react";
import Login from './Dashboard/Pages/Login';
import PrivateRouter from './Dashboard/Components/PrivateRouter';
import AddUser from './Dashboard/Pages/AddUser';
import ManageUser from './Dashboard/Pages/ManageUser';
import AddCategory from './Dashboard/Pages/AddCategory'
import Profile from './Dashboard/Pages/Profile';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New loading state




  return (
    <>

      <div>
        <div className='grid-container' >


          <Routes>
            <Route element={<PrivateRouter />}>
            <Route path='/dashboard' element={<Dashboard setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />}></Route>
            <Route path='/name-list' element={<NameList />}></Route>
            <Route path='/add-user' element={<AddUser setIsLoggedIn={setIsLoggedIn} />}></Route>
            <Route path='/manage-users' element={<ManageUser setIsLoggedIn={setIsLoggedIn} setIsLoading={setIsLoading} isLoading={isLoading} />}></Route>
            <Route path='/add-category' element={<AddCategory setIsLoggedIn={setIsLoggedIn} />}></Route>
            <Route path='/profile' element={<Profile setIsLoggedIn={setIsLoggedIn} />}></Route>
        
            </Route>
            <Route path='/' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setIsLoading={setIsLoading} isLoading={isLoading} />}></Route>
          </Routes>

        </div>

      </div>


    </>
  );
}

export default App;
