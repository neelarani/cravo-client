'use client';

import { orderApi } from '@/redux/api/order.api';

const MyOrder = () => {
  const { data, isLoading } = orderApi.useAllOrderQuery();
  const orders = data?.data || [];

  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center text-primary">
        Loading orders...
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="w-full h-full flex items-center justify-center text-destructive">
        No orders found
      </div>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map(order => (
          <div
            key={order._id}
            className="p-4 border rounded-lg shadow-sm bg-card"
          >
            <p>
              <span className="font-semibold">Order ID:</span> {order._id}
            </p>
            <p>
              <span className="font-semibold">Food ID:</span> {order.food}
            </p>
            <p>
              <span className="font-semibold">Quantity:</span> {order.quantity}
            </p>
            <p>
              <span className="font-semibold">Total Price:</span> $
              {order.totalPrice}
            </p>
            <p>
              <span className="font-semibold">Payment Method:</span>{' '}
              {order.paymentMethod}
            </p>
            <p>
              <span className="font-semibold">Payment Status:</span>{' '}
              {order.paymentStatus}
            </p>
            <p>
              <span className="font-semibold">Ordered At:</span>{' '}
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrder;
