import { createContext, useContext, useState, ReactNode } from "react";

// Define types for User and Context
type User = { [key: string]: string } | null;

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

// Create User Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a Provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for accessing User context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
