import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();

  const signup = async ({ fullname, username, password, gender }) => {
    const validation = handleInputErrors({
      fullname,
      username,
      password,
      gender,
    });

    if (!validation) {
      throw new Error("All fields are required");
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, username, password, gender }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Save to localstorage
      localStorage.setItem("chat-app-user", JSON.stringify(data.user));

      // context
      setAuthUser(data.user);

      setLoading(false);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { loading, signup };
};

function handleInputErrors({ fullname, username, password, gender }) {
  if (!fullname || !username || !password || !gender) {
    toast.error("All fields are required");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}

export default useSignup;
