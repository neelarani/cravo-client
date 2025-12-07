'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { authApi } from '@/redux';
import toast from 'react-hot-toast';

const MyProfile = () => {
  const { data: user, isLoading } = authApi.useGetMeQuery();
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSave = () => {
    if (avatar) {
      // API call to upload avatar
      toast.success('Avatar updated successfully!');
      setAvatar(null);
    } else {
      toast.error('Please select an avatar first.');
    }
  };

  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center text-primary">
        Loading...
      </div>
    );

  if (!user?.data)
    return (
      <div className="w-full h-full flex items-center justify-center text-destructive">
        No user data found
      </div>
    );

  return (
    <div className="w-full h-full bg-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl bg-card rounded-2xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row gap-10">
        {/* Avatar Section */}
        <div className="relative flex-shrink-0">
          <Image
            src={
              avatar
                ? URL.createObjectURL(avatar)
                : user.data.avatar_url || '/avatars/default.jpg'
            }
            alt="User Avatar"
            className="w-36 h-36 md:w-40 md:h-40 rounded-full object-cover border-4 border-border shadow-md"
            width={160}
            height={160}
          />
          <label className="absolute bottom-2 right-2 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 shadow-md">
            <input
              type="file"
              className="hidden"
              onChange={handleAvatarChange}
            />
            ✎
          </label>
        </div>

        {/* User Info Section */}
        <div className="flex-1 flex flex-col justify-center gap-4">
          <h1 className="text-3xl font-bold text-foreground">
            {user.data.full_name}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            {user.data.email}
          </p>
          <p className="text-muted-foreground text-sm md:text-base">
            Role: {user.data.role}
          </p>

          <button
            onClick={handleSave}
            className="mt-4 w-max bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium shadow hover:bg-primary/90 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
