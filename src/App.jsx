import { Route, Routes } from 'react-router'
import Navbar from './pages/Navbar'
import './style/App.css'
import Child from './pages/Child'
import FAQs from './pages/Customers/FAQs'
import ShippingReturns from './pages/Customers/ShippingReturns'
import OrderTracking from './pages/Customers/OrderTracking'
import PrivacyPolicy from './pages/Customers/PrivacyPolicy'
import TermsOfService from './pages/Customers/TermsOfService'
import AboutUs from './pages/Customers/AboutUs'
import ContactUs from './pages/Customers/ContactUs'
import Footer from './pages/Footer/Footer'
import { CartProvider } from './pages/Cart/CartContext'
import { useState } from 'react'
import ProductPage from './pages/Productpage/ProductPage'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import Dashboard from './pages/Auth/Dashboard'
import Checkout from './pages/Cart/Checkout'
import Collection from './pages/Collection/Collection'

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <>
      <CartProvider>
        <Navbar toggleCart={toggleCart} isCartOpen={isCartOpen} />
        <Routes>
          <Route path="/" element={<Child />} />

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/collection:/category" element={<Collection />} />

          <Route path="/faqs" element={<FAQs />} />
          <Route path="/ship" element={<ShippingReturns />} />
          <Route path="/ordertrack" element={<OrderTracking />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/tearms" element={<TermsOfService />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />

          <Route path="/product/:id" element={<ProductPage toggleCart={toggleCart} />} />
        </Routes>
        <Footer />
      </CartProvider>


    </>
  )
}

export default App
