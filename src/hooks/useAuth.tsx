import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

import { UserType } from "@/types/user";

export const withAuth = <P,>(WrappedComponent: React.ComponentType<P>) => {
  function AuthWrapper(props: React.PropsWithChildren<P>) {
    const router = useRouter();
    useEffect(() => {
      const accessToken = localStorage.getItem("user");
      if (!accessToken) {
        router.push("/signin");
      }
    });
    return <WrappedComponent {...props} />;
  }
  return AuthWrapper;
};

type userContextType = {
  user: UserType | null | undefined;
  setUser: (newUser: UserType | null | undefined) => void;
};

const UserContext = createContext<userContextType>({
  user: undefined,
  setUser: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null | undefined>(undefined);
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const newUser = JSON.parse(data) as UserType;
      setUser(newUser);
    } else {
      setUser(null);
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const { user } = useContext(UserContext);
  return user;
}

export function useSetUser() {
  const { setUser } = useContext(UserContext);
  function handleSetUserData(newUser: UserType | null | undefined) {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
  }
  return handleSetUserData;
}
