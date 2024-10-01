import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    const validation = handleInputErrors(username, password);

    if (!validation) {
      throw new Error("All fields are required");
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      setAuthUser(data.user);

      return data;
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

function handleInputErrors(username, password) {
  if (!username || !password) {
    toast.error("All fields are required");
    return false;
  }

  return true;
}
export default useLogin;
