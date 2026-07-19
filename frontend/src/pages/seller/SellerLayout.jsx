import React from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { Link, Outlet, NavLink } from "react-router-dom";

export default function SellerLayout() {
  const { isSeller, setIsSeller } = useAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  function logout() {
    setIsSeller(false);
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white">
      <div className="shrink-0 flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300 overflow-hidden scrollbar-none">
        <Link to="/">
          <img
            src={assets.logo}
            alt="Logo"
            className="cursor-pointer w-32 md:w-36"
          />
        </Link>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button
            onClick={() => logout()}
            className="border rounded-full text-sm px-4 py-1"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <div className="md:w-64 w-16 shrink-0 border-r text-base border-gray-300 pt-4 flex flex-col transition-all duration-300 h-full overflow-y-auto no-scrollbar">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 
                            ${
                              isActive
                                ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                                : "hover:bg-gray-100/90 border-white"
                            }`
              }
            >
              <img src={item.icon} alt={item.name} className="w-7 h-7" />
              <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>
          ))}
        </div>
        <div className="flex flex-1 min-h-0 overflow-hidden flex-col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
