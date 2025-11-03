'use client';

import { account } from './appwrite';

// Check if user is authenticated
export const checkAuth = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    return null;
  }
};

// Login with email and password
export const login = async (email, password) => {
  try {
    await account.createEmailPasswordSession(email, password);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Logout
export const logout = async () => {
  try {
    await account.deleteSession('current');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    return null;
  }
};
