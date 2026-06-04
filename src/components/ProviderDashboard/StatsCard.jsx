
const StatsCard = ({ title, value, change, isPositive, icon: Icon }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-gray-800">{value}</h3>
        {change && (
          <p className={`text-xs font-semibold mt-2 flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? '↑' : '↓'} {change} <span className="text-gray-400 font-normal ml-1">from last week</span>
          </p>
        )}
      </div>
      <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
        <Icon size={24} />
      </div>
    </div>
  );
};

export default StatsCard;