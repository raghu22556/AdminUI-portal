import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';

const Layout = (Child) => {
  return function Component(props) {
    const [drawer, setDrawer] = useState(false);
    const handleToggle = () => setDrawer(!drawer);

    return (
      <div className="flex relative h-screen overflow-hidden">
        {/* Sidebar */}
        <section
          id="sidebar"
          style={{
            width: '23%',
            borderRight: '1px solid rgba(28, 28, 28, 0.1)',
          }}
          // className={`w-80 z-50 lg:w-80 overflow-y-auto md:w-96 shadow border-gray-200 bg-white p-2 md:static absolute h-full transition-all duration-50 ${
          //   drawer ? "md:hidden left-0" : "-left-full"
          // }`}
          className={`w-80 z-50 lg:w-80 overflow-y-auto md:w-80  border-gray-200 bg-white p-2 md:static absolute h-full transition-all duration-50 ${
            drawer ? 'md:hidden left-0' : '-left-full'
          }`}
        >
          <Sidebar handleToggle={handleToggle} />
        </section>

        {/* Navbar & Child */}
        <section className="overflow-auto h-full w-full bg-white">
          <Navbar handleToggle={handleToggle} drawer={drawer} />
          <div className="p-4 h-full bg-white">
            <Child {...props} />
          </div>
        </section>
      </div>
    );
  };
};

export default Layout;
