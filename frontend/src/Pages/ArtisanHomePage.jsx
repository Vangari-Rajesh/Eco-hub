import { Footer } from "../Components/Footer"
import { NavBarPostLogin } from "../Components/NavBarPostLogin"
import { WasteReqCards } from "../Components/WasteReqCards"
// import { useLoading } from "../Components/LoadingContext";
// import { useEffect } from "react";

function ArtisanHomePage() {
  

  // const { setIsLoading } = useLoading();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setIsLoading(true); // Start loading
  //       const response = await fetch('http://localhost:5001/signin');
  //       const data = await response.json();
  //       // Handle your data
  //     } catch (error) {
  //       // Handle error
  //     } finally {
  //       setIsLoading(false); // Stop loading regardless of success or error
  //     }
  //   };

  //   fetchData();
  // }, [setIsLoading]);

  
  return (
    <div>
        <div className="flex flex-col min-h-screen">
      <NavBarPostLogin />
      <div className="flex-grow">
        <WasteReqCards />
      </div>
      <Footer />
    </div>
    </div>
  )
}

export default ArtisanHomePage
