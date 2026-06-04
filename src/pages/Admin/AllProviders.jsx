import SideBar from "../../components/AdminLayout/SideBar";
import { useEffect, useState } from "react";
import API from "../../api/axios";
const AllProviders = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.get("/user/getAllProviders"); 
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching providers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-800 font-sans">
      <SideBar />
      
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-8 border-b border-slate-200 pb-5">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">All Providers</h1>
            <p className="text-slate-500 mt-1 text-sm">Manage and view all registered providers.</p>
          </div>

          {loading ? (
            <div className="text-center p-10 text-slate-500">Loading providers...</div>
          ) : users.length === 0 ? (
            <div className="text-center p-10 bg-white rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-400">No providers found.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
                      <th className="py-4 px-6">Name</th>
                      <th className="py-4 px-6">Email</th>
                      <th className="py-4 px-6">Phone</th>
                      <th className="py-4 px-6">Address</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-6 font-medium text-slate-900">{user.name}</td>
                        <td className="py-4 px-6 text-slate-500">{user.email}</td>
                        <td className="py-4 px-6 font-mono text-slate-600">{user.phone}</td>
                        <td className="py-4 px-6 text-slate-500">{user.address}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AllProviders
