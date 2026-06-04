import { useEffect, useState } from "react";
import API from "../../api/axios";
import SideBar from "./SideBar";
import AdminCards from "./AdminCards";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/Admin/dashboard");

        setStats(res.data.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="flex">
      <SideBar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">
          Admin Dashboard
        </h1>

        <AdminCards stats={stats} />
      </div>
    </div>
  );
};

export default Dashboard;