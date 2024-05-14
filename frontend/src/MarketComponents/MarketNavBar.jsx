import { Menu, X, ShoppingCart,ChevronRight } from 'lucide-react'; // Replace ShoppingCart with the actual cart icon if different
import logo from '../assets/logomain.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const menuItems = [
  {
    name: 'Home',
    href: '/customer-dashboard',
  },
];

// export function MarketNavBar() {
  export function MarketNavBar({ setSearchQuery }) {
    const handleSearchInputChange = (e) => {
      setSearchQuery(e.target.value);
    };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto flex max-w-8xl mb-10 items-center justify-between px-6 py-2 sm:px-8 lg:px-10">
        <div className="inline-flex items-center space-x-2">
          <Link to="/customer-dashboard">
            <img src={logo} alt="Logo" className="h-16 mt-2" />
          </Link>
        </div>
        <div className="hidden lg:block">
          <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="inline-flex items-center text-md font-semibold text-gray-800 hover:text-gray-900"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex grow justify-end">
      <input
        className="flex h-10 w-[250px] rounded-md bg-gray-100 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 mr-6"
        type="text"
        placeholder="Search"
        onChange={handleSearchInputChange}
      />
    </div>
        <div className="ml-2 mt-2 hidden lg:block">
          <span className="relative inline-block">
            <Link to ="/customer-profile">
            <img
              className="h-12 w-12 rounded-full mr-6"
              src="src/assets/avatar.jpg" // Update the path if necessary
              alt="User"
            />
            </Link>
          </span>
        </div>
        {/* Add to Cart Button */}
        <Link to='/cart'>
        <button
      
          className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#617a4f] hover:bg-[#617a4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <ShoppingCart className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
          Cart
        </button>
        </Link>
        <div className="ml-2 lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <Link to="/homepage">
                      <img src={logo} alt="Logo" className="h-20" />
                    </Link>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                        <ChevronRight className="ml-3 h-4 w-4" />
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

