import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

const DEFAULT_USERS = [
  {
    id: 'usr_demo_1',
    name: 'Larry Davidson',
    email: 'demo@example.com',
    password: 'Password123!',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    role: 'user',
    createdAt: new Date().toISOString()
  }
];

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    try {
      const savedUsers = localStorage.getItem('movie_app_users');
      if (savedUsers) {
        return JSON.parse(savedUsers);
      }
      localStorage.setItem('movie_app_users', JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    } catch (e) {
      console.error('Error reading users from localStorage', e);
      return DEFAULT_USERS;
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('movie_app_current_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error('Error reading current user from localStorage', e);
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  // Sync users list to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('movie_app_users', JSON.stringify(users));
    } catch (e) {
      console.error('Error saving users to localStorage', e);
    }
  }, [users]);

  // Sync current user to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('movie_app_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('movie_app_current_user');
      }
    } catch (e) {
      console.error('Error saving current user to localStorage', e);
    }
  }, [currentUser]);

  // Register user
  const register = async (name, email, password) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = users.find((u) => u.email.toLowerCase() === normalizedEmail);

        if (existingUser) {
          toast.error('An account with this email already exists!');
          setLoading(false);
          resolve({ success: false, message: 'Email already exists' });
          return;
        }

        const newUser = {
          id: `usr_${Date.now()}`,
          name: name.trim(),
          email: normalizedEmail,
          password: password,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
          role: 'user',
          createdAt: new Date().toISOString()
        };

        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        
        // Auto-login after registration
        const { password: _, ...userWithoutPassword } = newUser;
        setCurrentUser(userWithoutPassword);
        
        toast.success(`Welcome aboard, ${newUser.name}! Account created.`);
        setLoading(false);
        resolve({ success: true, user: userWithoutPassword });
      }, 500);
    });
  };

  // Login user
  const login = async (email, password) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const normalizedEmail = email.trim().toLowerCase();
        const matchedUser = users.find(
          (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
        );

        if (!matchedUser) {
          toast.error('Invalid email or password. Please check your credentials.');
          setLoading(false);
          resolve({ success: false, message: 'Invalid credentials' });
          return;
        }

        const { password: _, ...userWithoutPassword } = matchedUser;
        setCurrentUser(userWithoutPassword);
        toast.success(`Welcome back, ${matchedUser.name}! 👋`);
        setLoading(false);
        resolve({ success: true, user: userWithoutPassword });
      }, 500);
    });
  };

  // Reset / Forgot Password
  const resetPassword = async (email, newPassword) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const normalizedEmail = email.trim().toLowerCase();
        const userIndex = users.findIndex((u) => u.email.toLowerCase() === normalizedEmail);

        if (userIndex === -1) {
          toast.error('No account found with this email address.');
          setLoading(false);
          resolve({ success: false, message: 'Email not found' });
          return;
        }

        const updatedUsers = [...users];
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          password: newPassword
        };

        setUsers(updatedUsers);
        toast.success('Password reset successfully! Please log in with your new password.');
        setLoading(false);
        resolve({ success: true });
      }, 500);
    });
  };

  // Logout user
  const logout = () => {
    setCurrentUser(null);
    toast.info('You have been logged out.');
  };

  const value = {
    currentUser,
    users,
    loading,
    register,
    login,
    resetPassword,
    logout,
    isAuthenticated: !!currentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
