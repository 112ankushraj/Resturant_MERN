import React, { useState } from "react";
import {
  ShoppingBag,
  Calendar,
  Users,
  IndianRupee,
  TrendingUp,
  CheckCircle,
  XCircle,
  PlusCircle,
} from "lucide-react";

// Card for stats
const StatCard = ({ icon: Icon, title, value, color }) => (
  <div className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4 hover:shadow-xl transition-shadow">
    <div className={`p-3 rounded-full ${color} flex items-center justify-center`}>
      <Icon className="text-white w-6 h-6" />
    </div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  </div>
);

// Recent activity item
const ActivityItem = ({ icon: Icon, text, color }) => (
  <li className="flex items-center gap-3">
    <Icon className={`w-5 h-5 ${color}`} />
    <p className="text-gray-700">{text}</p>
  </li>
);

const Dashboard = () => {
  // Dummy/static stats
  const [stats] = useState({
    totalOrders: 1245,
    todaysBookings: 38,
    customers: 820,
    monthlyRevenue: 245000,
  });

  const [recentActivity] = useState([
    { text: "✅ Order #1234 delivered", icon: CheckCircle, color: "text-green-500" },
    { text: "📅 New booking (4 persons)", icon: PlusCircle, color: "text-blue-500" },
    { text: "🍔 Menu item updated", icon: PlusCircle, color: "text-purple-500" },
    { text: "❌ Order #1228 cancelled", icon: XCircle, color: "text-red-500" },
  ]);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Restaurant Dashboard 🍽️</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          icon={ShoppingBag}
          title="Total Orders"
          value={stats.totalOrders}
          color="bg-blue-600"
        />
        <StatCard
          icon={Calendar}
          title="Today's Bookings"
          value={stats.todaysBookings}
          color="bg-green-600"
        />
        <StatCard
          icon={Users}
          title="Customers"
          value={stats.customers}
          color="bg-purple-600"
        />
        <StatCard
          icon={IndianRupee}
          title="Monthly Revenue"
          value={`₹${stats.monthlyRevenue.toLocaleString("en-IN")}`}
          color="bg-orange-600"
        />
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Overview */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-700">Sales Overview</h3>
            <TrendingUp className="text-green-600" />
          </div>
          <div className="flex-1 flex items-center justify-center text-gray-400 h-60">
            <p>📊 Chart coming soon</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-500">Pending Orders</p>
              <p className="font-semibold text-gray-800">12</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-500">Delivered Orders</p>
              <p className="font-semibold text-gray-800">320</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-500">Cancelled Orders</p>
              <p className="font-semibold text-gray-800">5</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Recent Activity</h3>
          <ul className="space-y-3">
            {recentActivity.map((act, i) => (
              <ActivityItem key={i} {...act} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
