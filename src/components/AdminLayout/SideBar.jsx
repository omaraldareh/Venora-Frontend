import {
  LayoutDashboard,
  Clock3,
  CalendarDays,
  Users,
  UserCog,
  Star,
  Settings,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const SideBar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      name: "Pending Halls",
      icon: Clock3,
      path: "/admin/pending-halls",
    },
    {
      name: "Users",
      icon: Users,
      path: "/admin/users",
    },
    {
      name: "Providers",
      icon: UserCog,
      path: "/admin/providers",
    },
    {
      name: "Bookings",
      icon: CalendarDays,
      path: "/admin/bookings",
    },
    {
      name: "Reviews",
      icon: Star,
      path: "/admin/reviews",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-10 text-center">
        Venora
      </h1>

      <nav className="space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-violet-600"
                    : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideBar;