import { useGetDashboardQuery } from "../features/dashboard/dashboardApi";

const Dashboard = () => {
  const { data, isLoading, error } = useGetDashboardQuery();

  if (isLoading) return <p>Loading dashboard...</p>;
  if (error) return <p>Error loading dashboard</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* TOP STATS */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-blue-100 rounded">
          <p>Total Products</p>
          <p className="text-3xl font-bold">{data.totalProducts}</p>
        </div>

        <div className="p-4 bg-red-100 rounded">
          <p>Low Stock Items</p>
          <p className="text-3xl font-bold">{data.lowStockCount}</p>
        </div>
      </div>

      {/* RECENT STOCK MOVEMENTS (BONUS) */}
      <div>
        <h2 className="text-xl font-semibold mb-3">
          Recent Stock Movements
        </h2>

        {data.recentMovements.length === 0 ? (
          <p className="text-gray-500">No recent movements</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Product</th>
                <th className="border p-2">Type</th>
                <th className="border p-2">Quantity</th>
              </tr>
            </thead>

            <tbody>
              {data.recentMovements.map((move) => (
                <tr key={move._id}>
                  <td className="border p-2">
                    {move.product?.name || "N/A"}
                  </td>
                  <td className="border p-2">
                    <span
                      className={
                        move.type === "IN"
                          ? "text-green-600 font-bold"
                          : "text-red-600 font-bold"
                      }
                    >
                      {move.type}
                    </span>
                  </td>
                  <td className="border p-2">{move.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
