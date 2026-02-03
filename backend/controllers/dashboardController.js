import Order from "../models/Order.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Total Orders
    const totalOrders = await Order.countDocuments();

    // Today's Bookings
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todaysBookings = await Booking.countDocuments({
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    // Customers (users)
    const customers = await User.countDocuments({ role: "user" });

    // Monthly Revenue (Delivered orders only)
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );

    const deliveredOrders = await Order.find({
      status: "Delivered",
      createdAt: { $gte: startOfMonth },
    });

    const monthlyRevenue = deliveredOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    return res.json({
      success: true,
      stats: {
        totalOrders,
        todaysBookings,
        customers,
        monthlyRevenue,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return res.status(500).json({
      success: false,
      message: "Dashboard stats error",
    });
  }
};
