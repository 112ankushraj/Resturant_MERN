import Cart from "../models/cartModel.js";
import Menu from "./../models/menuModel.js";

export const addToCart = async (req, res) => {
  try {
    const { menuItemId, quantity } = req.body;
    const { id } = req.user;

    const menuItem = await Menu.findById(menuItemId);
    if (!menuItem)
      return res.status(404).json({ message: "Menu Item not found" });

    let cart = await Cart.findOne({ user: id });
    if (!cart) {
      cart = new Cart({ user: id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.menuItem.toString() === menuItemId,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ menuItem: menuItemId, quantity });
    }

    await cart.save();
    res
      .status(200)
      .json({ message: "Item added to cart", success: true, cart });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal Server Error", success: false });
  }
};

// get user cart
export const getCart = async (req, res) => {
  try {
    const { id } = req.user;
    const cart = await Cart.findOne({ user: id }).populate("items.menuItem");

    if (!cart) return res.status(200).json({ items: [] });

    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal Server Error", success: false });
  }
};

// remove from cart
export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { menuItemId } = req.body;
    const cart = await Cart.findOne({ user: id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    cart.items = cart.items.filter(
      (item) => item.menuItem.toString() !== menuItemId,
    );
    await cart.save();
    res
      .status(200)
      .json({ message: "Items removed from cart", success: true, cart });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal Server Error", success: false });
  }
};
