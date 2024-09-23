import { Suspense } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";

import LoginPage from "../features/auth/LoginPage";
import ProductsPage from "../features/products/ProductsPage";
import ProductDetailPage from "../features/products/ProductDetailPage";
import CreateProductPage from "../features/products/CreateProductPage";
import CreateUserPage from "../features/users/CreateUserPage";
import CartPage from "../features/users/CartPage";
import ShopPage from "../features/users/ShopPage";
import CheckoutPage from "../features/users/CheckoutPage";
import ErrorPage from "../features/errors/ErrorPage";

const Routes = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/products" component={ProductsPage} />
        <Route path="/products/create" component={CreateProductPage} />
        <Route path="/products/:productId" component={ProductDetailPage} />
        <Route path="/user/signup" component={CreateUserPage} />
        <Route path="/user/cart" component={CartPage} />
        <Route path="/user/shop" component={ShopPage} />
        <Route path="/user/checkout" component={CheckoutPage} />
        <Route component={ErrorPage} /> {/* Fallback route for undefined paths */}
      </Routes>
    </Suspense>
  </Router>
);

export default Routes;
