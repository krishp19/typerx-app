"use client";

import { useState, useEffect } from "react";

export default function UserDetails({ userId }) {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const data = await response.json();
        setUserDetails(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-neutral-700 animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 w-24 bg-neutral-700 rounded animate-pulse"></div>
          <div className="h-3 w-32 bg-neutral-700 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-4">
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${userId}`}
          alt="User"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="font-medium text-white">
            User {userId.substring(0, 8)}
          </h3>
          <p className="text-sm text-neutral-400">Error loading details</p>
        </div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="flex items-center space-x-4">
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${userId}`}
          alt="User"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="font-medium text-white">
            User {userId.substring(0, 8)}
          </h3>
          <p className="text-sm text-neutral-400">User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={userDetails.imageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${userId}`}
        alt={userDetails.fullName || "User"}
        className="w-10 h-10 rounded-full"
      />
      <div>
        <h3 className="font-medium text-white">
          {userDetails.fullName || `User ${userId.substring(0, 8)}`}
        </h3>
        {userDetails.email && (
          <p className="text-sm text-neutral-400">{userDetails.email}</p>
        )}
      </div>
    </div>
  );
} 