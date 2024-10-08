import  { useState } from 'react';
import axios from 'axios'
import { useLoading } from '../Components/LoadingContext';
import { Slide, ToastContainer,toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { NavBarPostLogin } from '../Components/NavBarPostLogin';


function WasteReqForm() {
  const { setIsLoading } = useLoading();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [materialRequired, setMaterialRequired] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    transformFile(file);
  };

  const transformFile = (file)=>{
    const reader = new FileReader()
    if(file){
      reader.readAsDataURL(file)
      reader.onloadend = ()=>{
        setUploadedImage(reader.result);
      }
    }else{
      setUploadedImage("");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5001/uploadWasteReq", {
        image: uploadedImage,
        title,
        description,
        materialRequired,
        price,
        quantity
      }, {withCredentials: true});

      if(response.data.msg === "Waste requirement uploaded successfully"){
        
        toast.success(response.data.msg, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition:Slide
          });
          await new Promise((resolve) => setTimeout(resolve, 2000));
          navigate('/artisan-dashboard');
        setUploadedImage(null);
        setTitle("");
        setDescription("");
        setMaterialRequired("");
        setPrice("");
        setQuantity("");
      }
      else{
        toast.warn(response.data.msg, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition:Slide
          });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <NavBarPostLogin/>
    <div className="flex justify-center items-center min-h-screen bg-[url(src/assets/low-poly-grid-haikei.svg)]">
      <div className="flex flex-row bg-white p-6 rounded-lg shadow-lg" style={{ maxWidth: '1600px' }}>
        {uploadedImage && (
          <div className="flex-none w-1/2 pr-4">
            <img 
              src={uploadedImage} 
              alt="Uploaded" 
              className="rounded-md max-w-full h-auto"
              style={{ maxHeight: '800px' }}
            />
          </div>
        )}

        <div className={`flex-grow ${uploadedImage ? 'w-1/2' : 'w-full'}`}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="file" 
              onChange={handleImageChange} 
              accept="image/"
              className="block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-[#617a4f] file:text-white
                         hover:file:bg-[#617a4f]"
            />

            {/* Form fields */}
            <div className="space-y-4 mt-4">
              {/* Other form inputs (title, description, price) go here */}
              <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input 
                id="title"
                name="title"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter title"
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
              />
            </div>

            {/* Description Input */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea 
                id="description"
                name="description"
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter description"
                value={description}
                onChange={(e)=>{setDescription(e.target.value)}}
              />
            </div>

            {/* Materials used Input */}
            <div>
              <label htmlFor="materialRequired" className="block text-sm font-medium text-gray-700">Materials Required</label>
              <textarea 
                id="materialRequired"
                name="materialRequired"
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Material required"
                value={materialRequired}
                onChange={(e)=>{setMaterialRequired(e.target.value)}}
              />
            </div>
            
            {/* Price Input */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
              <input 
                id="price"
                name="price"
                type="number"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter price"
                value={price}
                onChange={(e)=>{setPrice(e.target.value)}}
              />
            </div>

            {/* Quantity Input */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
              <input 
                id="quantity"
                name="quantity"
                type="number"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={(e)=>{setQuantity(e.target.value)}}
              />
            </div>
            </div>


            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#617a4f] hover:bg-[#617a4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
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
          transition:Slide
        />
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default WasteReqForm;