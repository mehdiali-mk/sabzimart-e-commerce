import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets, dummyOrders } from "../../assets/assets";

export default function Orders() {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [totalEarned, setTotalEarned] = useState();
  useEffect(() => {
    const fetchOrders = async () => {
      // Create a copy of dummyOrders to avoid mutating the original array
      const sortedOrders = [...dummyOrders].sort((a, b) => {
        // Priority 1: Payment Status (Pending first)
        if (a.isPaid !== b.isPaid) {
          return a.isPaid ? 1 : -1;
        }

        // Priority 2: Amount (Biggest first / Descending)
        if (a.amount !== b.amount) {
          return b.amount - a.amount;
        }

        // Priority 3: Date
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();

        if (!a.isPaid) {
          // If Pending: Oldest date first (Ascending)
          return dateA - dateB;
        } else {
          // If Paid: Latest date first (Descending)
          return dateB - dateA;
        }
      });

      setOrders(sortedOrders);
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const findTotalEarned = async () => {
      // Note: Using reduce is a bit cleaner and more performant than map for summing values
      const total = orders.reduce((sum, order) => sum + order.amount, 0);
      setTotalEarned(total);
    };

    findTotalEarned();
  }, [orders]);
  return (
    <div className="no-scrollbar h-full min-h-0 overflow-y-auto flex flex-col justify-between">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium flex justify-between">
          <span>Orders List</span>
          <span className="flex items-center justify-center gap-2">
            <span>Earned:</span>{" "}
            <span className="text-primary text-3xl">
              <span className="text-lg">{currency}</span>
              {totalEarned}
            </span>
          </span>
        </h2>
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300"
          >
            <div className="flex gap-5 max-w-80">
              <img
                className="w-12 h-12 object-cover"
                src={assets.box_icon}
                alt="boxIcon"
              />
              <div>
                {order.items.map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <p className="font-medium">
                      {item.product.name}{" "}
                      <span className="text-primary">x {item.quantity}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm md:text-base text-black/60">
              <p className="font-medium mb-1">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>
                {order.address.street}, {order.address.city},{" "}
              </p>
              <p>
                {order.address.state},{order.address.zipcode},{" "}
                {order.address.country}
              </p>
              <p>{order.address.phone}</p>
            </div>

            <p className="font-medium text-sm my-auto">
              {currency} <span className="text-xl">{order.amount}</span>
            </p>

            <div className="flex flex-col text-sm md:text-base text-black/60">
              <p>Method: {order.paymentType}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
