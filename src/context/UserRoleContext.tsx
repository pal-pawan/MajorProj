'use client';
import { useContext,createContext, ReactNode, useState } from "react";

interface UserRoleContextType {
    userSelectedRole: string;
    setUserSelectedRole: (role: string) => void;
}

const UserRoleContext = createContext<UserRoleContextType | null> (null);

export const UserRoleProvider = ({children}:{children:ReactNode})=>{
    const [userSelectedRole, setUserSelectedRole] = useState<string>("");

    return(
        <UserRoleContext.Provider value ={{userSelectedRole, setUserSelectedRole}}>
            {children}
        </UserRoleContext.Provider>
    )
}

export const useUserRole = () => {
    const context = useContext(UserRoleContext);
    if (!context) {
      throw new Error("useUserRole must be used within a UserRoleProvider");
    }
    return context;
  };