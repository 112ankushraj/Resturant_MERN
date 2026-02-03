import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import {
  Calendar,
  LogOut,
  Menu,
  Package,
  ShoppingCart,
  UserCircle,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { navigate, user, setUser, axios, cartCount } = useContext(AppContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const logout = async () => {
    try {
      const { data } = await axios.post("/api/auth/logout");
      if (data.success) {
        setUser(null);
        toast.success(data.message);
        navigate("/");
        setIsMenuOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Overlay */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 md:hidden"
        />
      )}

      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src="./logo.png" alt="Food Express" className="w-32" />
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {["Home", "Menus", "Book Table", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={
                    item === "Home"
                      ? "/"
                      : `/${item.toLowerCase().replace(" ", "-")}`
                  }
                  className="relative font-medium text-gray-700 hover:text-orange-500 transition
                  after:absolute after:w-0 after:h-[2px] after:bg-orange-500 after:left-0 after:-bottom-1
                  hover:after:w-full after:transition-all"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <button
                onClick={() => navigate("/cart")}
                className="relative p-2 rounded-full hover:bg-orange-50 transition"
              >
                <ShoppingCart />
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount || 0}
                </span>
              </button>

              {/* Desktop Profile */}
              {user ? (
                <div className="relative hidden md:block">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                  >
                    <UserCircle size={30} />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl overflow-hidden">
                      <Link
                        to="/my-bookings"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                      >
                        <Calendar size={18} /> My Bookings
                      </Link>
                      <Link
                        to="/my-orders"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                      >
                        <Package size={18} /> My Orders
                      </Link>
                      <button
                        onClick={logout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50"
                      >
                        <LogOut size={18} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="hidden md:block bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition"
                >
                  Login
                </button>
              )}

              {/* Mobile Toggle */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <Menu />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* CENTER POPUP MOBILE MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center md:hidden px-4">
          <div
            className="
              w-full max-w-sm
              bg-white/90 backdrop-blur-xl
              rounded-3xl shadow-2xl
              p-6
              animate-[scaleIn_0.3s_ease-out]
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                🍔 Food Express
              </h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-200 transition"
              >
                <X />
              </button>
            </div>

            {/* Links */}
            <div className="space-y-4">
              {["Home", "Menus", "Book Table", "Contact"].map((item) => (
                <Link
                  key={item}
                  to={
                    item === "Home"
                      ? "/"
                      : `/${item.toLowerCase().replace(" ", "-")}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center text-lg font-medium text-gray-800 py-3 rounded-xl hover:bg-orange-100 hover:text-orange-600 transition"
                >
                  {item}
                </Link>
              ))}
            </div>

            <hr className="my-5" />

            {/* Auth */}
            {user ? (
              <div className="space-y-3">
                <Link
                  to="/my-bookings"
                  className="flex items-center justify-center gap-3 py-2 rounded-xl hover:bg-gray-100"
                >
                  <Calendar /> My Bookings
                </Link>
                <Link
                  to="/my-orders"
                  className="flex items-center justify-center gap-3 py-2 rounded-xl hover:bg-gray-100"
                >
                  <Package /> My Orders
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center justify-center gap-3 w-full py-2 rounded-xl text-red-600 hover:bg-red-50"
                >
                  <LogOut /> Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/login");
                }}
                className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
