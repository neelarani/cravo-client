/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { authApi } from '@/redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

// Zod schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<LoginData>>({});

  const [login, { isLoading }] = authApi.useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<LoginData> = {};
      result.error.issues.forEach(err => {
        const field = err.path[0] as keyof LoginData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      toast.success('Login successful!');
      router.push('/');
      setFormData({ email: '', password: '' });
    } catch (error: any) {
      toast.error(error?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-card p-8 rounded-2xl w-full max-w-md shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-primary mb-4">
          Login
        </h2>

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

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 pr-10 rounded-lg border border-gray-300"
          />

          {/* Eye button */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-destructive text-sm">{errors.password}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-chart-5 text-accent font-semibold rounded-lg hover:opacity-90 cursor-pointer"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <div>
          <Link href={'/register'}>
            You Don&#39;t have an account?{' '}
            <span className="text-blue-500 text-base font-semibold underline cursor-pointer">
              join
            </span>
          </Link>
        </div>
        <Link
          href={'/forgot-password'}
          className="text-base hover:underline cursor-pointer text-blue-500"
        >
          Forgot Password
        </Link>
      </form>
    </div>
  );
}
