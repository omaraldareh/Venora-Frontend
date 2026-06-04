import { Plus, Edit2, Trash2 } from 'lucide-react';

const YourHalls = ({ halls = [], onEdit, onDelete, onAddNew }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Your Halls</h3>
          <p className="text-gray-400 text-xs mt-0.5">Manage, edit, or remove your listed venues</p>
        </div>
        
        <button 
          onClick={onAddNew}
          className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition shadow-sm"
        >
          <Plus size={16} />
          Add New Hall
        </button>
      </div>

      {/* Halls List */}
      <div className="space-y-4 max-h-125 overflow-y-auto pr-2">
  {halls.length === 0 ? (
    <p className="text-gray-400 text-sm text-center py-4">
      No halls added yet
    </p>
  ) : (
    halls.map((hall) => (
      <div
        key={hall._id}
        className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-3">
          <img
            src={hall.images?.[0] || "https://via.placeholder.com/150"}
            alt={hall.name}
            className="w-14 h-14 rounded-xl object-cover"
          />

          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-gray-800 text-sm">
                {hall.name}
              </h4>

              <span
                className={`px-2 py-1 rounded-full text-[10px] font-semibold ${
                  hall.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : hall.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {hall.status}
              </span>
            </div>

            <p className="text-gray-400 text-xs mt-1">
              {hall.location?.city}, {hall.location?.address}
            </p>

            {hall.status === "pending" && (
              <p className="text-yellow-600 text-xs mt-1">
                Waiting for admin approval
              </p>
            )}

            {hall.status === "rejected" && (
              <p className="text-red-600 text-xs mt-1">
                This hall was rejected
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit?.(hall._id)}
            className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
          >
            <Edit2 size={16} />
          </button>

          <button
            onClick={() => onDelete?.(hall._id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    ))
  )}
</div>
    </div>
  );
};

export default YourHalls;