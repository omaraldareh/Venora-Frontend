import API from "../../api/axios";
import SideBar from "../../components/AdminLayout/SideBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PendingHalls = () => {
  const [halls, setHalls] = useState([]);
  const navigate = useNavigate(); // 2. تعريف الـ navigate

  useEffect(() => {
    const fetchPendingHalls = async () => {
      try {
        const response = await API.get("/Admin/getPendingHalls");
        setHalls(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPendingHalls();
  }, []);

  const approveHall = async (id, e) => {
    e.stopPropagation(); // يمنع الانتقال لصفحة التفاصيل عند الضغط على الزر
    try {
      await API.patch(`/Admin/approveHall/${id}`);
      setHalls((prev) => prev.filter((hall) => hall._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const rejectHall = async (id, e) => {
    e.stopPropagation(); // يمنع الانتقال لصفحة التفاصيل عند الضغط على الزر
    try {
      await API.patch(`/Admin/rejectHall/${id}`);
      setHalls((prev) => prev.filter((hall) => hall._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-800 font-sans">
      <SideBar />

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 border-b border-slate-200 pb-5">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Pending Halls
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              Review and manage pending hall submissions for approval or rejection.
            </p>
          </div>

          {halls.length === 0 ? (
            <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center mt-10">
              <p className="text-slate-400 text-lg font-medium">No pending halls to review right now.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {halls.map((hall) => (
                <div
                  key={hall._id}
                  // 3. عند الضغط على الكرت يتم نقله لصفحة تفاصيل الصالة مع تمرير الـ ID
                  onClick={() => navigate(`/browse/${hall._id}`)}
                  className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer"
                >
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img
                      src={hall.images?.[0] || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop"} 
                      alt={hall.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-white font-bold px-3 py-1.5 rounded-xl text-sm shadow-sm">
                      {hall.price} JD
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-950 line-clamp-1 group-hover:text-violet-600 transition-colors">
                        {hall.name}
                      </h2>

                      <div className="flex items-start gap-2 text-slate-500 mt-3 text-sm">
                        <svg className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="line-clamp-2">
                          {hall.location?.city} • {hall.location?.address}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6 pt-4 border-t border-slate-50">
                      <button
                        // 4. مررنا الـ event (e) للدالة
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-xl shadow-sm shadow-emerald-600/10 hover:shadow-lg transition-all active:scale-[0.98]"
                        onClick={(e) => approveHall(hall._id, e)}
                      >
                        Approve
                      </button>

                      <button
                        // 5. مررنا الـ event (e) للدالة
                        className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-600 font-medium py-2.5 px-4 rounded-xl transition-all active:scale-[0.98]"
                        onClick={(e) => rejectHall(hall._id, e)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PendingHalls;