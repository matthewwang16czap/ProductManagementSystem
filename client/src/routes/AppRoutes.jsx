import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "../ui/Layout";
import LoginPage from "../features/auth/LoginPage";
import ProductsPage from "../features/products/ProductsPage";
import ProductDetailPage from "../features/products/ProductDetailPage";
import CreateProductPage from "../features/products/CreateProductPage";
import CreateUserPage from "../features/users/CreateUserPage";
import CartPage from "../features/users/CartPage";
import ShopPage from "../features/users/ShopPage";
import CheckoutPage from "../features/users/CheckoutPage";
import ErrorPage from "../features/errors/ErrorPage";

const AppRoutes = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/create" element={<CreateProductPage />} />
          <Route path="products/:productId" element={<ProductDetailPage />} />
          <Route path="user/signup" element={<CreateUserPage />} />
          <Route path="user/cart" element={<CartPage />} />
          <Route path="user/shop" element={<ShopPage />} />
          <Route path="user/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<ErrorPage />} /> 
        </Route>
      </Routes>
    </Suspense>
  </Router>
);

export default AppRoutes;
