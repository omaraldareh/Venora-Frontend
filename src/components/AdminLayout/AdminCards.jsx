import {
  Users,
  Building2,
  Clock3,
  CheckCircle,
  XCircle,
  CalendarDays,
} from "lucide-react";

const AdminCards = ({ stats }) => {
  if (!stats) return <p>Loading...</p>;

  const cards = [
    {
      title: "Users",
      value: stats.totalUser,
      icon: Users,
    },
    {
      title: "Providers",
      value: stats.totalProviders,
      icon: Users,
    },
    {
      title: "Total Halls",
      value: stats.totalHalls,
      icon: Building2,
    },
    {
      title: "Pending Halls",
      value: stats.totalPendingHalls,
      icon: Clock3,
    },
    {
      title: "Approved Halls",
      value: stats.totalApprovedHalls,
      icon: CheckCircle,
    },
    {
      title: "Rejected Halls",
      value: stats.totalRejectedHalls,
      icon: XCircle,
    },
    {
      title: "Bookings",
      value: stats.totalBookings,
      icon: CalendarDays,
    },
    {
      title: "Reviews",
      value: stats.totalReviews,
      icon: CalendarDays,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">{card.title}</p>
                <h2 className="text-3xl font-bold mt-2">
                  {card.value}
                </h2>
              </div>

              <Icon size={30} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminCards;