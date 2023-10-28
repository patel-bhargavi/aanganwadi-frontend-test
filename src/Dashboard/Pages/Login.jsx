import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login({ setIsLoggedIn, isLoggedIn , isLoading , setIsLoading}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isLoading, setIsLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true when the request starts
    try {
      const response = await axios.post('https://aanganwadi-test.onrender.com/api/v1/user/user_login', { email, password });
      if (response.data.status === "failure") {
        toast.warning(response.data.msg);
      } else {
        const { token } = response.data;
        localStorage.setItem('token', token);
        toast.success('Logged In successfully');
        setIsLoggedIn(true);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error('Invalid');
      console.error('Error logging in: ', error);
    } finally {
      setIsLoading(false); // Set loading state back to false when the request is complete
    }
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        navigate("/dashboard")
      ) : (
        <div className="login template d-flex justify-content-center align-items-center vw-100 vh-100 ">
          <div className="form_container p-5 rounded bg-white ">
            <form className="form" onSubmit={handleLogin}>
              <h1 className="text-center mb-4 fw-bold">Login</h1>
              <div className="mb-3">
                {/* <label htmlFor="username" className="form-label fw-bold float-start">
                  Username
                </label> */}
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  id="email"
                  className="form-control"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-5">
                {/* <label htmlFor="password" className="form-label fw-bold float-start">
                  Password
                </label> */}
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  name=""
                  id="password"
                  className="form-control"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              <div className="d-grid mt-4">
                <button className="btn" id="login_btn" type="submit" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Log In'}
               </button>
              </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
