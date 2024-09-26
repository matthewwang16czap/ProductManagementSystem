import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import searchIcon from "../assets/search.svg";
import personIcon from "../assets/person-circle.svg";
import shopIcon from "../assets/shop.svg";
import cartIcon from "../assets/cart.svg";

import { getUser } from "../features/users/usersSlice";

function Layout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    console.log(user, loading, error);
  }, [location, user, loading, error]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div
      className="container-fluid"
      style={{ paddingLeft: 0, paddingRight: 0 }}
    >
      <header
        className="container-fluid text-center p-2"
        style={{ backgroundColor: "#F0F8FF" }}
      >
        <div className="row g-1 justify-content-center">
          <div className="col-4">Management</div>
          <div className="col-6">
            <div className="input-group input-group-sm">
              <span className="input-group-text" id="search-button">
                <img src={searchIcon} alt="Search" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder=""
                aria-label="Search"
                aria-describedby="search-button"
              />
            </div>
          </div>
          <div className="col-1 dropdown">
            <button
              type="button"
              className="btn btn-link dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img src={personIcon} alt="Me" />
            </button>
            {user ? (
              <ul
                className="dropdown-menu text-center"
                style={{ minWidth: "inherit" }}
              >
                <li>
                  <Link
                    className="dropdown-item"
                    to="/logout"
                    state={{ from: location }}
                  >
                    Logout
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="/user/changepassword"
                  >
                    Change Password
                  </Link>
                </li>
              </ul>
            ) : (
              <ul
                className="dropdown-menu text-center"
                style={{ minWidth: "inherit" }}
              >
                <li>
                  <Link
                    className="dropdown-item"
                    to="/login"
                    state={{ from: location }}
                  >
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <div className="col-1">
            {user &&
              (user.role === "admin" ? (
                <img src={shopIcon} alt="Shop" />
              ) : (
                <img src={cartIcon} alt="Cart" />
              ))}
          </div>
        </div>
      </header>
      <main className="container-fluid mt-3">
        <Outlet /> {/* This is where the routed components will be rendered */}
      </main>
      <footer
        className="footer fixed-bottom text-center p-3"
        style={{ backgroundColor: "#F0F8FF" }}
      >
        <div className="row g-1 justify-content-center">
          <div className="col-6">@2024 All Rights Reserved.</div>
          <div className="col-6">Contact Us.</div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
