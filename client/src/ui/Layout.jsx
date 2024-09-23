import { Outlet } from 'react-router-dom';

const Layout = () => (
  <div>
    <header>
      {/* Your header content here */}
      <h1>My App</h1>
    </header>
    <main>
      <Outlet /> {/* This is where the routed components will be rendered */}
    </main>
  </div>
);

export default Layout;
