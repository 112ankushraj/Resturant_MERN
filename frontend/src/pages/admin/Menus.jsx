import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";

const Menus = () => {
  const { menus, fetchMenus, axios } = useContext(AppContext);

  const deleteMenu = async (id) => {
    try {
      const { data } = await axios.delete(`/api/menu/delete/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchMenus();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-12">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-gray-800 text-center">
        All Menus
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-gray-700 font-semibold uppercase tracking-wider">
                Image
              </th>
              <th className="text-left px-6 py-3 text-gray-700 font-semibold uppercase tracking-wider">
                Name
              </th>
              <th className="text-left px-6 py-3 text-gray-700 font-semibold uppercase tracking-wider">
                Category
              </th>
              <th className="text-left px-6 py-3 text-gray-700 font-semibold uppercase tracking-wider">
                Price
              </th>
              <th className="text-left px-6 py-3 text-gray-700 font-semibold uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {menus.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md shadow-sm"
                  />
                </td>
                <td className="px-6 py-4 text-gray-800 font-medium">{item?.name}</td>
                <td className="px-6 py-4 text-gray-700">{item?.category?.name}</td>
                <td className="px-6 py-4 text-gray-700 font-semibold">
                  ₹{Number(item.price).toLocaleString("en-IN")}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteMenu(item._id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 font-semibold transition-colors"
                  >
                    <CircleX size={20} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {menus.length === 0 && (
        <p className="text-center text-gray-500 mt-6 text-lg">
          No menus available.
        </p>
      )}
    </div>
  );
};

export default Menus;
