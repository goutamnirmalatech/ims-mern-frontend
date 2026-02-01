import { useState } from "react";
import {
  useGetProductsQuery,
  useAddProductMutation,
  useStockInMutation,
  useStockOutMutation,
} from "../features/products/productsApi";

const Products = () => {
  const { data = [], isLoading, refetch } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [stockIn] = useStockInMutation();
  const [stockOut] = useStockOutMutation();

  // 🔐 role from localStorage
  const role = localStorage.getItem("role");

  // ➕ form states
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    quantity: "",
    lowStockThreshold: "",
  });

  // ✏️ input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 💾 submit product
  const handleSubmit = async (e) => {
    e.preventDefault();

    await addProduct({
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      lowStockThreshold: Number(formData.lowStockThreshold),
    });

    setFormData({
      name: "",
      sku: "",
      category: "",
      price: "",
      quantity: "",
      lowStockThreshold: "",
    });

    setShowForm(false);
    refetch();
  };

  // ➕ stock IN
  const handleStockIn = async (productId) => {
    const qty = prompt("Enter quantity to add");
    if (!qty) return;

    await stockIn({ productId, quantity: Number(qty) });
    refetch();
  };

  // ➖ stock OUT
  const handleStockOut = async (productId) => {
    const qty = prompt("Enter quantity to remove");
    if (!qty) return;

    await stockOut({ productId, quantity: Number(qty) });
    refetch();
  };

  if (isLoading) return <p>Loading products...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* ➕ ADD PRODUCT BUTTON */}
      {role === "admin" && (
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-4 bg-blue-600 text-white px-4 py-2"
        >
          Add Product
        </button>
      )}

      {/* 📝 ADD PRODUCT FORM */}
      {showForm && role === "admin" && (
        <form onSubmit={handleSubmit} className="mb-6 border p-4">
          <input
            name="name"
            placeholder="Product Name"
            className="border p-2 mr-2 mb-2"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            name="sku"
            placeholder="SKU"
            className="border p-2 mr-2 mb-2"
            value={formData.sku}
            onChange={handleChange}
          />

          <input
            name="category"
            placeholder="Category"
            className="border p-2 mr-2 mb-2"
            value={formData.category}
            onChange={handleChange}
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            className="border p-2 mr-2 mb-2"
            value={formData.price}
            onChange={handleChange}
          />

          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            className="border p-2 mr-2 mb-2"
            value={formData.quantity}
            onChange={handleChange}
          />

          <input
            name="lowStockThreshold"
            type="number"
            placeholder="Low Stock Threshold"
            className="border p-2 mr-2 mb-2"
            value={formData.lowStockThreshold}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2"
          >
            Save Product
          </button>
        </form>
      )}

      {/* 📦 PRODUCTS TABLE */}
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">SKU</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Status</th>
            {role === "admin" && (
              <th className="border p-2">Actions</th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((product) => (
            <tr key={product._id}>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.sku}</td>
              <td className="border p-2">{product.quantity}</td>

              <td className="border p-2">
                {product.quantity <= product.lowStockThreshold ? (
                  <span className="text-red-600 font-bold">Low Stock</span>
                ) : (
                  <span className="text-green-600 font-bold">In Stock</span>
                )}
              </td>

              {role === "admin" && (
                <td className="border p-2">
                  <button
                    onClick={() => handleStockIn(product._id)}
                    className="bg-green-600 text-white px-2 py-1 mr-2"
                  >
                    Stock IN
                  </button>
                  <button
                    onClick={() => handleStockOut(product._id)}
                    className="bg-red-600 text-white px-2 py-1"
                  >
                    Stock OUT
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;

