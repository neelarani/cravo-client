'use client';

import Image from 'next/image';
import { FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';
import { z } from 'zod';

// Zod schema
const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^\d+$/, 'Phone number must contain only digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
});

type FormData = z.infer<typeof bookingSchema>;

export default function PopularItems() {
  const dishes = [
    {
      id: 1,
      name: 'Chicken Biryani',
      price: '৳250',
      img: 'https://i.ibb.co/Vmm0xwN/biryani.jpg',
      desc: 'Aromatic basmati rice cooked with tender chicken and rich spices.',
    },
    {
      id: 2,
      name: 'Beef Burger',
      price: '৳180',
      img: 'https://i.ibb.co/nC5X8jn/burger.jpg',
      desc: 'Juicy beef patty with fresh veggies and special sauce.',
    },
    {
      id: 3,
      name: 'Pizza Margherita',
      price: '৳350',
      img: 'https://i.ibb.co/pPjrW0t/pizza.jpg',
      desc: 'Classic cheesy pizza topped with fresh basil and tomatoes.',
    },
    {
      id: 4,
      name: 'Pasta Alfredo',
      price: '৳300',
      img: 'https://i.ibb.co/fFfWj7F/pasta.jpg',
      desc: 'Creamy Alfredo pasta with soft chicken slices.',
    },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<(typeof dishes)[0] | null>(
    null
  );
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    address: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const openModal = (dish: (typeof dishes)[0]) => {
    setSelectedDish(dish);
    setModalOpen(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = bookingSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<FormData> = {};
      (result.error?.errors || []).forEach(err => {
        const field = err.path[0] as keyof FormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    alert(`Booking for ${selectedDish?.name} submitted!`);
    console.log('Booking Data:', { dish: selectedDish?.name, ...formData });
    setModalOpen(false);
    setFormData({ name: '', phone: '', address: '' });
  };

  return (
    <div className="min-h-screen bg-muted/50 py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-primary">
        Featured Dishes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8 mx-auto container">
        {dishes.map(dish => (
          <div
            key={dish.id}
            className="bg-card text-card-foreground shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <Image
              src={dish.img}
              alt={dish.name}
              width={400}
              height={400}
              className="w-full h-56 object-cover"
            />

            <div className="p-5">
              <h2 className="text-2xl font-semibold mb-1">{dish.name}</h2>
              <p className="text-lg font-bold mb-2 text-primary">
                {dish.price}
              </p>
              <p className="text-muted-foreground text-sm mb-4">{dish.desc}</p>

              <button
                className="w-full bg-chart-5 text-primary-foreground py-2 rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                onClick={() => openModal(dish)}
              >
                <FaShoppingCart />
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && selectedDish && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-card p-8 rounded-2xl w-full max-w-md shadow-xl relative"
            onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <h2 className="text-2xl font-bold mb-4 text-primary">
              Booking for {selectedDish.name}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg border border-gray-300"
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg border border-gray-300"
                />
                {errors.phone && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg border border-gray-300"
                />
                {errors.address && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.address}
                  </p>
                )}
              </div>

              {/* Payment Option */}
              <div className="mt-4">
                <p className="mb-2 font-semibold text-primary">Payment</p>
                <button
                  type="button"
                  className="w-full bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 transition-all"
                  onClick={() =>
                    alert('SSLCommerz payment integration placeholder')
                  }
                >
                  Pay with SSLCommerz
                </button>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-gray-400 font-semibold hover:bg-gray-500"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-chart-5 text-accent hover:opacity-90 font-semibold cursor-pointer"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
