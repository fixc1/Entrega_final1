import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer'; 
import ItemDetailContainer from './pages/ItemDetailContainer';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

import Hero from './components/Hero'; 

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CartProvider } from './context/CartContext'; 
import { AuthProvider, useAuth } from './context/AuthContext'; 

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <NavBar />
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <ItemListContainer />
                </>
              } />
        
              <Route path="/category/:categoryId" element={<ItemListContainer />} />
              
              <Route path="/item/:id" element={<ItemDetailContainer />} />
              
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />

              <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
            </Routes>
          </div>
          <ToastContainer position="bottom-right" />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;