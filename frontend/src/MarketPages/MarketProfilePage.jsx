import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react'
import user_avatar from '../assets/user_avatar.json'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { MarketNavBar } from '../MarketComponents/MarketNavBar';

const UserDetails = ({ label, value }) => (
  <div className="flex items-center justify-between border p-4 rounded-lg mb-4">
    <h3 className="text-md font-medium text-gray-900">{label}:</h3>
    <p className="text-md text-gray-700">{value}</p>
  </div>
);

const MarketProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/user', { withCredentials: true });
        setUser(response.data);
      } catch (err) {
        setError('Error fetching user data');
        console.error(err);
      }
    };

    fetchUserData();
  }, []);
 

  const toggleProductDetails = (productId) => {
    setSelectedProductId((prevSelectedProductId) =>
      prevSelectedProductId === productId ? null : productId
    );
  };
  

  axios.defaults.withCredentials = true;
    
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5001/logout');
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };


  if (error) {
    return <div className="text-red-500 text-center mt-8">Error: {error}</div>;
  }

  if (!user) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <>
    <MarketNavBar/>
    <div className="container mx-auto p-4 flex flex-col md:flex-row items-start justify-center gap-8">
      {/* User Info */}
      <div className="inline-flex items-center space-x-2">
        
        </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 max-w-md">
  <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">User Details</h1>
  <div className="flex flex-col items-center">
    <Lottie animationData={user_avatar} style={{ width: "200px", height: "200px", marginBottom: "16px" }} />
    <div className="w-full ">
      <UserDetails label="Username" value={user.username} className="pr-4" />
      <UserDetails label="Email" value={user.email} />
      <UserDetails label="Number of Orders" value={user.boughtProducts.length} />
    </div>
  </div>
  {/* Logout Button */}
  <button
        className="self-start mt-4 ml-4 p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
        onClick={handleLogout}
    >
        <div className='p-2'>
            Logout
            <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
        </div>
    </button>
</div>


      {/* Bought Products */}
      <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Products Purchased</h2>
            <ul>
              {user.boughtProducts.map((product, index) => (
                <li key={index} className="mb-4">
                  <button
                    onClick={() => toggleProductDetails(index)}
                    className="btn btn-outline-primary"
                  >
                    {product.title}
                  </button>
                  {selectedProductId === index && (
                    <div className="mt-2 p-4 bg-gray-100 rounded-lg">
                      <p className="text-muted">Material Used: {product.materialUsed}</p>
                      <p className="text-muted">Price: ${product.price}</p>
                      <p className="text-muted">Quantity: {product.quantity}</p>
                      <p className="text-muted">Dimensions: {product.dimensions}</p>
                      <p className="text-muted">Order-id: {product.order_id}</p>
                      <p className="text-muted">payment-id: {product.payment_id}</p>
                      {/* Add more details as needed */}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            </div>
    </div>
    </>
  );
};

export default MarketProfilePage;