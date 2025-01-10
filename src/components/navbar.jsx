import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import PropTypes from "prop-types";
import logo from "../assets/images/logo.png";

function Navbar({ user }) {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-[#121217] py-5 font-roboto sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo and Brand */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-10 transition-transform duration-200 hover:scale-105"
          />
          <h1 className="text-2xl font-semibold text-white transition-colors duration-200 hover:text-[#ffb347]">
            Codex Express
          </h1>
        </div>

        {/* Navigation Items */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                isActive(item.path)
                  ? "bg-[#ff8906] text-white"
                  : "text-gray-300 hover:text-[#ffb347]"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-white hidden md:block">
                Welcome,{" "}
                {user.user_metadata?.first_name || user.email.split("@")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium rounded-md bg-[#ff8906] text-white 
                         hover:bg-[#e07b05] transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-sm font-medium rounded-md bg-[#ff8906] text-white 
                       hover:bg-[#e07b05] transition-colors duration-300"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    user_metadata: PropTypes.shape({
      first_name: PropTypes.string,
    }),
  }),
};

export default Navbar;
