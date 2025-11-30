/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { authApi } from '@/redux';
import Link from 'next/link';

// Zod schema
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterData = z.infer<typeof registerSchema>;

export default function Register() {
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<RegisterData>>({});

  const [register, { isLoading }] = authApi.useRegisterMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<RegisterData> = {};
      (result.error?.issues || []).forEach(err => {
        const field = err.path[0] as keyof RegisterData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await register({
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      }).unwrap();

      console.log(formData);
      toast.success(`Registration successful! Welcome, ${formData.name}`);
      setFormData({ name: '', email: '', phone: '', password: '' });
    } catch (error: any) {
      toast.error(error?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-card p-8 rounded-2xl w-full max-w-md shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-primary mb-4">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded-lg border border-gray-300"
        />
        {errors.name && (
          <p className="text-destructive text-sm">{errors.name}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 rounded-lg border border-gray-300"
        />
        {errors.email && (
          <p className="text-destructive text-sm">{errors.email}</p>
        )}

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 rounded-lg border border-gray-300"
        />
        {errors.phone && (
          <p className="text-destructive text-sm">{errors.phone}</p>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 rounded-lg border border-gray-300"
        />
        {errors.password && (
          <p className="text-destructive text-sm">{errors.password}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-chart-5 text-accent font-semibold rounded-lg hover:opacity-90"
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
        <div>
          <Link href={'/login'}>
            Already you have an account?{' '}
            <span className="text-blue-500 font-semibold underline cursor-pointer">
              login
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}
