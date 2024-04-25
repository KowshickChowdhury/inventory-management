import React from 'react';

const Sidenav = () => {
  return (
    <div className="bg-gray-200 h-screen w-2/12">
      <ul>
          <li><a href="/page1" className="block p-4">Page 1</a></li>
          <li><a href="/page2" className="block p-4">Page 2</a></li>
      </ul>
  </div>
  );
};

export default Sidenav;
