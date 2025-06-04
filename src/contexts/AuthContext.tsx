
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  users: User[];
  addUser: (username: string, password: string, role: 'admin' | 'user') => boolean;
  changePassword: (userId: string, newPassword: string) => boolean;
  deleteUser: (userId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface StoredUser extends User {
  password: string;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Initialize default admin user
  useEffect(() => {
    const storedUsers = localStorage.getItem('catalogos_users');
    if (!storedUsers) {
      const defaultUsers: StoredUser[] = [
        {
          id: '1',
          username: 'admin',
          password: 'admin123',
          role: 'admin',
          createdAt: new Date().toISOString(),
        }
      ];
      localStorage.setItem('catalogos_users', JSON.stringify(defaultUsers));
      setUsers(defaultUsers.map(({ password, ...user }) => user));
    } else {
      const parsedUsers: StoredUser[] = JSON.parse(storedUsers);
      setUsers(parsedUsers.map(({ password, ...user }) => user));
    }

    // Check if user is logged in
    const loggedInUser = localStorage.getItem('catalogos_current_user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const storedUsers: StoredUser[] = JSON.parse(localStorage.getItem('catalogos_users') || '[]');
    const foundUser = storedUsers.find(u => u.username === username && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('catalogos_current_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('catalogos_current_user');
  };

  const addUser = (username: string, password: string, role: 'admin' | 'user'): boolean => {
    const storedUsers: StoredUser[] = JSON.parse(localStorage.getItem('catalogos_users') || '[]');
    
    // Check if username already exists
    if (storedUsers.some(u => u.username === username)) {
      return false;
    }

    const newUser: StoredUser = {
      id: Date.now().toString(),
      username,
      password,
      role,
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem('catalogos_users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers.map(({ password, ...user }) => user));
    return true;
  };

  const changePassword = (userId: string, newPassword: string): boolean => {
    const storedUsers: StoredUser[] = JSON.parse(localStorage.getItem('catalogos_users') || '[]');
    const userIndex = storedUsers.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
      storedUsers[userIndex].password = newPassword;
      localStorage.setItem('catalogos_users', JSON.stringify(storedUsers));
      return true;
    }
    return false;
  };

  const deleteUser = (userId: string): boolean => {
    const storedUsers: StoredUser[] = JSON.parse(localStorage.getItem('catalogos_users') || '[]');
    const filteredUsers = storedUsers.filter(u => u.id !== userId);
    
    localStorage.setItem('catalogos_users', JSON.stringify(filteredUsers));
    setUsers(filteredUsers.map(({ password, ...user }) => user));
    return true;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      users,
      addUser,
      changePassword,
      deleteUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
