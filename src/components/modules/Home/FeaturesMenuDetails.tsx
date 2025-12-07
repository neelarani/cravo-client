/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import { menuApi } from '@/redux';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { paymentApi } from '@/redux/api/payment.api';
import toast from 'react-hot-toast';

const FeaturesMenuDetails = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const { data, isLoading, error } = menuApi.useGetSingleMenuQuery(id!);
  const dish = data?.data;
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'ONLINE'>('COD');

  const [createPayment, { isLoading: isOrdering }] =
    paymentApi.useCreatePaymentMutation();

  if (isLoading)
    return (
      <p className="text-center mt-20 text-muted-foreground">Loading...</p>
    );
  if (error)
    return (
      <p className="text-center mt-20 text-destructive">Failed to load dish.</p>
    );
  if (!dish)
    return (
      <p className="text-center mt-20 text-muted-foreground">Dish not found.</p>
    );

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () =>
    setQuantity(prev => (prev > 1 ? prev - 1 : prev));
  const totalPrice = Number(dish.price) * quantity;

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res: any = await createPayment({
        foodId: dish._id,
        quantity,
        paymentMethod,
      }).unwrap();

      if (paymentMethod === 'COD') {
        toast.success('Order placed! Pay on delivery.');
        setOpenModal(false);
      } else if (paymentMethod === 'ONLINE') {
        const url = res?.data?.checkoutUrl;

        if (url) {
          router.push(url);
        } else {
          toast.error('Stripe checkout URL missing');
        }
      }
    } catch (err: any) {
      alert(err?.data?.message || 'Something went wrong');
    }
  };

  return (
    <>
      <div className="min-h-screen py-16 px-4 bg-muted">
        <div className="container md:px-12 mx-auto bg-card shadow-lg rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 mt-24">
          <div className="w-full h-full">
            <Image
              src={dish.img}
              alt={dish.name}
              width={800}
              height={800}
              className="w-full h-80 md:h-full object-cover"
            />
          </div>

          <div className="p-8 flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4 text-card-foreground">
              {dish.name}
            </h1>
            {dish.title && (
              <h2 className="text-2xl text-muted-foreground mb-4">
                {dish.title}
              </h2>
            )}
            <p className="text-xl font-semibold text-primary mb-4">
              ${dish.price}
            </p>
            <p className="text-muted-foreground mb-4">{dish.description}</p>
            <p className="text-muted-foreground font-semibold mb-6">
              Category: {dish.category}
            </p>

            <button
              onClick={() => setOpenModal(true)}
              className="bg-primary text-primary-foreground py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition-all w-fit cursor-pointer"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center  px-4">
          <div className="bg-card p-8 rounded-xl shadow-xl w-full max-w-lg relative">
            <button
              className="absolute top-3 right-3 text-4xl font-bold text-foreground hover:text-primary cursor-pointer"
              onClick={() => setOpenModal(false)}
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center text-foreground">
              Complete Your Order
            </h2>

            <form className="space-y-4" onSubmit={handleOrder}>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border rounded-lg bg-background"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border rounded-lg bg-background"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full px-4 py-3 border rounded-lg bg-background"
              />
              <textarea
                placeholder="Your Address"
                className="w-full px-4 py-3 border rounded-lg bg-background h-28"
              ></textarea>

              <div className="flex items-center justify-between mt-2">
                <span className="font-semibold text-lg">Quantity:</span>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={handleDecrease}
                    className="px-3 py-1 bg-gray-200 rounded-lg"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{quantity}</span>
                  <button
                    type="button"
                    onClick={handleIncrease}
                    className="px-3 py-1 bg-gray-200 rounded-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              <p className="text-xl font-bold text-primary mt-4">
                Total: ${totalPrice.toFixed(2)}
              </p>

              <div>
                <select
                  value={paymentMethod}
                  onChange={e =>
                    setPaymentMethod(e.target.value as 'COD' | 'ONLINE')
                  }
                  className="w-full px-4 py-3 border rounded-lg bg-background"
                >
                  <option value="ONLINE">Pay Online</option>
                  <option value="COD">Cash on Delivery</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isOrdering}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-all cursor-pointer"
              >
                {paymentMethod === 'COD' ? 'Place Order' : 'Pay Now'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturesMenuDetails;
