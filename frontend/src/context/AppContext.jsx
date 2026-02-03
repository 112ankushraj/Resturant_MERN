import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(() => !!localStorage.getItem("admin"));

  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/category/all");
      if (data.success) setCategories(data.categories);
    } catch (err) {
      console.log("Error fetching categories:", err);
    }
  };

  // Fetch all menus
  const fetchMenus = async () => {
    try {
      const { data } = await axios.get("/api/menu/all");
      if (data.success) setMenus(data.menuItems);
    } catch (err) {
      console.log("Error fetching menus:", err);
    }
  };

  useEffect(() => {
    const isAuth = async () => {
      try {
        const { data } = await axios.get("/api/auth/is-auth");
        if (data.success) setUser(data.user);
      } catch (err) {
        console.log(err);
      }
    };

    isAuth();
    fetchCategories();
    fetchMenus();
  }, []);

  return (
    <AppContext.Provider
      value={{
        navigate,
        loading,
        setLoading,
        user,
        setUser,
        admin,
        setAdmin,
        axios,
        categories,
        setCategories,
        fetchCategories,
        menus,
        setMenus,
        fetchMenus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
