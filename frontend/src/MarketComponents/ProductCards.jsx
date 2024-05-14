import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function ProductCards({ searchQuery }) {
  const [innovativeProdData, setInnovativeProdData] = useState([]);

  useEffect(() => {
    // Fetch innovative product data when the component mounts
    const fetchInnovativeProdData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/getInnovativeProd", { withCredentials: true });
        setInnovativeProdData(response.data);
      } catch (error) {
        console.error("Error fetching innovative product data:", error);
      }
    };

    fetchInnovativeProdData();
  }, []);

  // Filter the innovative products based on the search query
  const filteredProducts = innovativeProdData.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {filteredProducts.map((innovative_prd, index) => (
        <Link to={`/product/${innovative_prd._id}`} key={index}>
          <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <img src={innovative_prd.image} alt="Innovative Product" className="w-96 h-72 object-cover" />
            <div className="p-4">
              <h5 className="text-lg font-semibold mb-2">{innovative_prd.title}</h5>
              <p className="text-gray-700 text-sm">{innovative_prd.description}</p>
              {/* Add more details here */}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
