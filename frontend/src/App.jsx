// App.jsx

import { LoadingProvider, useLoading } from './Components/LoadingContext';
import LoadingComponent from './Pages/Loading';
import { Route, Routes } from 'react-router-dom';
import LoginScreen from './Pages/LoginScreen';
import SignupScreen from './Pages/SignUpScreen';
import ForgotPassword from './Pages/ForgotPassword';
import ArtisanHomePage from './Pages/ArtisanHomePage';
import InnovativeProductForm from './Pages/InnovativeProductForm';
import WasteReqForm from './Pages/WasteRequirementForm';
import ProductOverview from './MarketPages/ProductOverview';
import ContributorForm from './Pages/ContributorForm';
import ProfilePage from './Pages/ProfilePage';
import SatisfiedRequirementsPage from './Pages/SatisfiedRequirementsPage'
import MarketHomePage from './MarketPages/MarketHomePage'
import MarketProfilePage from './MarketPages/MarketProfilePage'

import './App.css';
import { IntroScreen } from './Pages/IntroScreen';
import About from './Pages/About';
import WasteReqOverview from './Pages/WasteReqOverview';
import { Cart } from './MarketComponents/Cart';
import PaymentSuccess from './MarketComponents/PaymentSuccess';
import  { Checkout } from './MarketComponents/Checkout';

const MainWithLoading = () => {
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading && <LoadingComponent />}
      <Routes>
        <Route path="/" element={<IntroScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/artisan-dashboard" element={<ArtisanHomePage />} />
        <Route path="/customer-dashboard" element={<MarketHomePage />} />
        <Route path="/iproductform" element={<InnovativeProductForm />} />
        <Route path="/wreqform" element={<WasteReqForm />} />
        <Route path="/wastereq/:id" element={<WasteReqOverview/>} />
        <Route path="/product/:id" element={<ProductOverview/>}/>
        <Route path="/contribute/:id" element={<ContributorForm />} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/customer-profile" element={<MarketProfilePage/>} />
        <Route path="/satisfiedRequirements" element={<SatisfiedRequirementsPage/>} />
        <Route path="/about" element={<About/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/paymentsuccess' element={<PaymentSuccess/>}/>
      </Routes>
    </>
  );
};

function App() {
  return (
    <LoadingProvider>
      <MainWithLoading />
    </LoadingProvider>
  );
}

export default App;