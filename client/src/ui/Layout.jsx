import { Outlet } from "react-router-dom";

import searchIcon from '../assets/search.svg';
import personIcon from '../assets/person-circle.svg';

const Layout = () => (
  <div
    className="container-fluid"
    style={{ "padding-left": 0, "padding-right": 0 }}
  >
    <header
      className="container-fluid text-center"
      style={{ padding: "0.5em", backgroundColor: "#F0F8FF" }}
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
        <div className="col-1"><img src={personIcon} alt="Me" /></div>
        <div className="col-1">shop</div>
      </div>
    </header>
    <main>
      <Outlet /> {/* This is where the routed components will be rendered */}
    </main>
  </div>
);

export default Layout;
