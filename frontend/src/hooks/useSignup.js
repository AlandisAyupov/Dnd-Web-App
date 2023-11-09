import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = async (file, username, email, password) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    const response = await axios.post("/api/profile/signup", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    navigate("/");

    if (!response.ok) {
      setIsLoading(false);
      setError(formData.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("profile", JSON.stringify(formData));

      // update the auth context
      dispatch({ type: "LOGIN", payload: formData });

      // update loading state
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
