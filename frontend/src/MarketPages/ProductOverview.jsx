import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams , Link } from 'react-router-dom';
import { MarketNavBar } from '../MarketComponents/MarketNavBar';

export const ProductOverview = () => {
  const [innovreq, setInnovreq] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [available,setAvailable]=useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInnovativeProdById = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/getInnovativeProd/${id}`, { withCredentials: true });
        setInnovreq(response.data);
        setAvailable(response.data.quantity        );
      } catch (error) {
        console.error('Error fetching Innovative request by ID:', error);
      }
    };

    fetchInnovativeProdById();
  }, [id]);
  console.log(innovreq," in react");
  console.log(available," available");

  const handleBuyNow = async () => {
    const userEmail = localStorage.getItem('email');
    const clearCartResponse = await axios.delete(`http://localhost:5001/buyEmpty`, { withCredentials: true });
   
  const {data:{key}}=await axios.get("http://localhost:5001/api/getkey")
  try{
    const {data:{order}}=await axios.post("http://localhost:5001/checkout",{title: innovreq.title,amount:innovreq.price})
    console.log(" i dont know but order-2 = ",order.id);
    console.log(window);
    const options ={
      key,
      amount:order.amount,
      currency:"INR",
      name:"Sinmplyjs",
      description:"Razorpay tutorial",
      image:"EcoHub\\EcoHub-For_Artisans-main\\Main\\frontend\\src\\assets\\avatar.jpg",
      order_id:order.id,
      handler: async function (response) {
        const body = {
          ...response,
          title:innovreq.title
        };
        console.log(body+" response of the handler ")
  
        const validateRes = await axios.post(
          'http://localhost:5001/paymentverification-2',
          body,
          {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true // Setting withCredentials to true
          }
        );
        const jsonRes =  validateRes.data;
        console.log(jsonRes+" response from verification my bad-2");
        if(validateRes.status==200){
          setAvailable(available-1);
        }
        alert(jsonRes);
        // window.location.reload();
  
      },
      prefill:{
        name:"Sagar gupta",
        email:"anandguptasir@gmail.com",
        contact:"1234567890"
      },
      notes:{
        "address":"razorapy official"
      },
      theme:{
        "color":"#3399cc"
      }
    };
    const razor = new window.Razorpay(options);
    razor.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });
    razor.open();
    e.preventDefault();
  }
catch(error){
  console.log("error in payment verification ",error);
}

    // navigate('/icheckout');
  };

  const handleAddToCart = async () => {
    if (quantity > 0) {
      try {
        console.log(innovreq);
        const userEmail = localStorage.getItem('email');
        const response = await axios.post(
          `http://localhost:5001/addToCart/`,
          { 
            title: innovreq.title,
            description: innovreq.description,
            materialUsed: innovreq.materialUsed,
            price: innovreq.price,
            quantity: quantity,
            dimensions: innovreq.dimensions,
            image: innovreq.image,
          },
          { withCredentials: true }
        );
        alert('You have added ' + innovreq.title + ' to the cart');
        setAvailable(available-1);
      } catch (error) {
        if (error.response && error.response.status === 500 && error.response.data.msg === "Product Unavailable") {
          // Show pop-up message for product unavailable
          alert('Product Are Out Of Stock ');}
      }
    } else {
      alert('Please add the product to the cart');
    }
  };

  if (!innovreq) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <MarketNavBar/>
    <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16 pt-8">
      {/* <div className="flex items-center">
        <ol className="flex w-full items-center overflow-hidden">
          <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
            <Link to="/customer-dashboard">Home</Link>
          </li>
          <li className="text-body mt-0.5 text-base">/</li>
          <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
            <Link to="/customer-dashboard">Products</Link>
          </li>
          <li className="text-body mt-0.5 text-base">/</li>
          <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
            {innovreq.title}
          </li>
        </ol>
      </div> */}
      <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
        <div className="col-span-6">
          <div className="duration-150 ease-in hover:opacity-90 mr-16">
            <img
              src={innovreq.image}
              alt={innovreq.title}
              className="w-full object-cover"
            />
          </div>
        </div>
        <div className="col-span-3 pt-8 lg:pt-0 ">
          <div className="mb-7 border-b border-gray-300 pb-7">
            <h2 className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
              {innovreq.title}
            </h2>
            <p className="text-body text-sm leading-6  lg:text-base lg:leading-8">
              {innovreq.description}
            </p>
            <div className="mt-5">
              <h3 className="text-lg font-semibold">Price:</h3>
              <span className="ml-2">${innovreq.price}</span>
            </div>
            <div className="mt-2">
              <h3 className="text-lg font-semibold">Quantity Available:</h3>
              <span className="ml-2">{quantity}</span>
            </div>
          </div>
          <div className="space-s-1 3xl:pr-48 flex items-center gap-2 md:pr-32 lg:pr-12 2xl:pr-32">
            <button
              type="button"
              className="h-11 w-full rounded-md bg-[#617a4f] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={handleAddToCart} disabled={available === 0}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="h-11 w-full rounded-md bg-[#617a4f] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={handleBuyNow} disabled={available === 0}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductOverview;
