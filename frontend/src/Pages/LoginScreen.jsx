import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavBarPreLogin } from '../Components/NavBarPreLogin';
import backgroundImage from '../assets/background.jpg'; // Import your background image here
import logo from '../assets/logomain.png';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignin = async (userType) => {
    try {
      const response = await axios.post('http://localhost:5001/signin', { email, password, userType }, { withCredentials: true });
      if (response.data.msg === 'Login successful' && response.status === 200) {
        toast.success(response.data.msg, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Slide,
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (userType === 'customer') {
          navigate('/customer-dashboard');
        } else if (userType === 'artisan') {
          navigate('/artisan-dashboard');
        }
      } else {
        toast.warn(response.data.msg, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Slide,
        });
      }
    } catch (err) {
      console.error('Login error: ', err.response.data);
      toast.error('An error occurred while logging in.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Slide,
      });
    }
  };

  return (
    <>
      <NavBarPreLogin />
      <div
        className="flex flex-row items-center justify-center min-h-screen bg-cover"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <form className="p-6 bg-neutral-100 rounded-3xl shadow-xl w-96 mb-24">
          <img src={logo} alt="Logo" className="mx-auto h-24" />
          <h2 className="text-lg font-semibold mb-4 text-black text-center">Login</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-black">
              <FontAwesomeIcon icon={faUser} className="text-gray-500 mr-2" />
              Email
            </label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-3xl w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">
              <FontAwesomeIcon icon={faLock} className="text-gray-500 mr-2" />
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-3xl w-full"
            />
          </div>
          <button
            className="px-4 py-2 my-2 text-white bg-[#617a4f] rounded-3xl hover:bg-emerald w-full"
            type="button"
            onClick={() => handleSignin('customer')}
          >
            Login as Customer
          </button>
          <button
            className="px-4 py-2 my-2 text-white bg-[#617a4f] rounded-3xl hover:bg-emerald w-full"
            type="button"
            onClick={() => handleSignin('artisan')}
          >
            Login as Artisan
          </button>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="light"
            transition={Slide}
          />
          <div className="flex justify-between mt-4">
            <Link to="/signup" className="text-sm text-black-400 hover:underline focus:outline-none">
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginScreen;
