import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Layout = lazy(() => import("../ui/Layout"));
const LoginPage = lazy(() => import("../features/auth/LoginPage"));
const LogoutPage = lazy(() => import("../features/auth/LogoutPage"));
const ProductsPage = lazy(() => import("../features/products/ProductsPage"));
const ProductDetailPage = lazy(() => import("../features/products/ProductDetailPage"));
const CreateEditProductsPage = lazy(() => import("../features/products/CreateEditProductsPage"));
const CreateUserPage = lazy(() => import("../features/users/CreateUserPage"));
const ChangePasswordPage = lazy(() => import("../features/users/ChangePasswordPage"));
const CartPage = lazy(() => import("../features/users/CartPage"));
const ShopPage = lazy(() => import("../features/users/ShopPage"));
const CheckoutPage = lazy(() => import("../features/users/CheckoutPage"));
const ErrorPage = lazy(() => import("../features/errors/ErrorPage"));

const AppRoutes = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="logout" element={<LogoutPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/create" element={<CreateEditProductsPage />} />
          <Route path="products/:productId" element={<ProductDetailPage />} />
          <Route path="products/:productId/edit" element={<CreateEditProductsPage />} />
          <Route path="user/signup" element={<CreateUserPage />} />
          <Route path="user/changepassword" element={<ChangePasswordPage />} />
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
