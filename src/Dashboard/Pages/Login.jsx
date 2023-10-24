import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import toast from 'react-hot-toast';
import { toast } from 'react-toastify';


function Login({ setIsLoggedIn, isLoggedIn }) {


  // const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the form from submitting the traditional way
    try {
      const response = await axios.post('https://aanganwadi-test.onrender.com/api/v1/user/user_login', { email, password });
      if (response.data.status === "failure") {
        console.log(response.data.msg);
        toast.warning(response.data.msg
          );
        
      } else {
        const { token } = response.data;
        localStorage.setItem('token', token);
        console.log(token);
        toast.success('Loggedin successfully')
        setIsLoggedIn(true);
        navigate("/dashboard");
        // Use navigate to redirect to the dashboard after successful login
        // if (token) {
        //     navigate("/dashboard");
        //   } else {
        //     console.log("error");
        //   }
      }
    } catch (error) {
      toast.error('Invalid')
      console.error('Error logging in: ', error);
    }
  };


  return (
    // <main className="main-container">
    //   {isLoggedIn ? (
    //     navigate('/dashboard')

    //   )
    //     : (
    //       <form onSubmit={handleLogin}>
    //         <div>
    //           <h1>Login Page</h1>
    //           <label htmlFor="username"

    //           >username</label>
    //           <input type="text" id='email' required onChange={(e) => setEmail(e.target.value)} />
    //           <label htmlFor="password">password</label>
    //           <input type="password" name="" id="password" required value={password}
    //             onChange={(e) => setPassword(e.target.value)} />
    //           <button>Log In</button>
    //         </div>
    //       </form>
    //     )}
    // </main>
    <div className="App">
      {isLoggedIn ? (
        navigate("/dashboard")
      ) : (
        <div className="login template d-flex justify-content-center align-items-center vw-100 vh-100 ">
          <div className="form_container p-5 rounded bg-white ">
            <form className="form" onSubmit={handleLogin}>
              <h1 className="text-center mb-4 fw-bold">Login</h1>

              <div className="mb-3">
                <label
                  htmlFor="username"
                  className="form-label fw-bold float-start"
                >
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  id="email"
                  className="form-control"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="form-label fw-bold float-start"
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name=""
                  id="password"
                  className="form-control"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid">
                <button className="btn" id="login_btn">
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
