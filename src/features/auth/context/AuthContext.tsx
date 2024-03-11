import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { LoginRequest, User } from "@/types";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { logoutUser } from "@/features/auth/api/logoutUser";
import { useMutation } from "react-query";
import { getOtp } from "../api/getOtp";
import { loginWithOtp } from "../api/loginWithOtp";
import { useUserMutation } from "@/features/user/hooks/useUserMutation";
import { authenticateAsGuest } from "../api/authenticateAsGuest";

type AuthProviderProps = {
  children: ReactNode;
};
type AuthContext = {
  isAuthenticated: boolean;
  currentUser: User | null;
  reloadUser: () => void;
  isLoading: boolean;
  requestOtp: (email: string) => void;
  logout: () => void;
  login: (email: string, token: string) => void;
  loginAsGuest: () => void;
};

const AuthContext = createContext<AuthContext | null>(null);

export const AuthContextProvider: FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, _setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const userMutation = useUserMutation();
  const getOtpMutation = useMutation({
    mutationFn: (email: string) => getOtp(email),
  });
  const loginMutation = useMutation({
    mutationFn: (loginRequest: LoginRequest) => loginWithOtp(loginRequest),
  });
  const loginAsGuestMutation = useMutation({
    mutationFn: authenticateAsGuest,
  });

  const isAuthenticated = !!currentUser;

  function login(email: string, token: string) {
    loginMutation
      .mutateAsync({ email, token })
      .then(setCurrentUser)
      .then(goToFromPage);
  }

  function loginAsGuest() {
    loginAsGuestMutation.mutateAsync().then(setCurrentUser).then(goToFromPage);
  }

  function requestOtp(email: string) {
    getOtpMutation.mutateAsync(email).then((result) => console.log(result));
  }

  function logout() {
    if (isAuthenticated) {
      logoutUser().then(() => setCurrentUser(null));
    }
  }

  function goToLoginPage() {
    const path = location.pathname;
    if (!path.startsWith("/login")) {
      navigate({
        pathname: "/login",
        search: createSearchParams({
          from: path,
        }).toString(),
      });
    }
  }

  function goToFromPage() {
    const fromURL = searchParams.get("from");
    if (fromURL) {
      navigate(fromURL);
    } else {
      navigate("/");
    }
  }

  function loadUser() {
    return userMutation.mutateAsync().then(setCurrentUser);
  }

  function reloadUser() {
    loadUser();
  }

  useEffect(() => {
    loadUser()
      .catch(() => {
        if (isAuthenticated) {
          logout();
        } else {
          goToLoginPage();
        }
      })
      .finally(() => setIsLoading(false));
  }, [isAuthenticated]);

  const contextData = {
    isAuthenticated,
    isLoading,
    reloadUser,
    currentUser,
    requestOtp,
    logout,
    login,
    loginAsGuest,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {isLoading ? <div>Loading Auth...</div> : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
