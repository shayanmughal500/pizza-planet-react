import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { ToastProvider } from './contexts/ToastContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { AuthProvider } from './contexts/AuthContext';
import useScrollReveal from './hooks/useScrollReveal';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Menu from './components/Menu';
import About from './components/About';
import Reviews from './components/Reviews';
import VIPClub from './components/VIPClub';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ToastContainer from './components/ToastContainer';
import BackToTop from './components/BackToTop';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';

function HomePage() {
  useScrollReveal();
  return (
    <>
      <Hero />
      <TrustBar />
      <Menu />
      <About />
      <Reviews />
      <VIPClub />
      <Contact />
      <Footer />
    </>
  );
}

function CustomerLayout() {
  return (
    <>
      <Header />
      <CartDrawer />
      <ToastContainer />
      <BackToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

function AdminLayout() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Admin />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Routes>
                <Route path="/admin" element={<AdminLayout />} />
                <Route path="/*" element={<CustomerLayout />} />
              </Routes>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}