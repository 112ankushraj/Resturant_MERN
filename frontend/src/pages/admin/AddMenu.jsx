import { Upload } from "lucide-react";
import { AppContext } from "../../context/AppContext";
import { useState, useContext } from "react";
import toast from "react-hot-toast";

const AddMenu = () => {
  const { axios, navigate, loading, setLoading, categories, setMenus } =
    useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setFormData({ ...formData, image: selectedFile });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("price", formData.price);
      dataToSend.append("description", formData.description);
      dataToSend.append("category", formData.category);
      dataToSend.append("image", formData.image);

      const { data } = await axios.post("/api/menu/add", dataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success(data.message);

        // ✅ Update menus instantly
        setMenus((prev) => [...prev, data.menuItem]);

        navigate("/admin/menus");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-12">
      <form className="max-w-2xl w-full mx-auto bg-white p-8 rounded-lg shadow-lg flex flex-col gap-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-gray-800 text-center">Add New Menu</h2>

        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-gray-700">Menu Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter Menu name"
          />
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-gray-700">Menu Price *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter Menu Price"
          />
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-gray-700">Menu Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter Menu Description"
          />
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-gray-700">Select Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">Select a category</option>
            {categories.map((item) => (
              <option key={item._id} value={item._id}>{item.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Menu Image *</label>
          <input type="file" id="fileUpload" className="hidden" onChange={handleFileChange} required />
          <label htmlFor="fileUpload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-400 transition">
            <Upload className="w-8 h-8 text-gray-500 mb-2" />
            <span className="text-gray-600 text-sm">{file ? file.name : "Click to upload an image"}</span>
          </label>
          {preview && <img src={preview} alt="preview" className="w-40 h-40 object-cover rounded-md mt-2 shadow-md" />}
        </div>

        <button type="submit" className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
          {loading ? "Adding..." : "Add Menu"}
        </button>
      </form>
    </div>
  );
};

export default AddMenu;
