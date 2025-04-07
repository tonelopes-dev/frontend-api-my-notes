import { createContext, useContext, useState, useEffect } from "react";

import { api } from "../services/api";

export const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [data, setData] = useState({});

  async function signIn({ email, password }) {
    try {
      const response = await api.post("/sessions", { email, password });
      const { user, token } = response.data;
      console.log(response.data);

      localStorage.setItem("@myappnotes:user", JSON.stringify(user));

      localStorage.setItem("@myappnotes:token", token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setData({ user, token });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível fazer o login");
      }
    }
  }

  async function signUp(user) {
    try {
      localStorage.setItem("@myappnotes:userUp", JSON.stringify(user));
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível fazer o login");
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@myappnotes:user");
    localStorage.removeItem("@myappnotes:token");

    setData({});
  }

  async function updateProfile({ user, avatarFile }) {
    try {
      if (avatarFile) {
        const fileUploadForm = new FormData();
        fileUploadForm.append("avatar", avatarFile);

        const response = await api.patch("/users/avatar", fileUploadForm);

        user.avatar = response.data.avatar;
      }

      await api.put("/users", user);
      localStorage.setItem("@myappnotes:user", JSON.stringify(user));

      setData({ user, token: data.token });

      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível atualizar o perfil.");
      }
    }
  }

  useEffect(() => {
    const user = localStorage.getItem("@myappnotes:user");

    const token = localStorage.getItem("@myappnotes:token");

    if (user && token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setData({ user: JSON.parse(user), token });
    }
  }, []);

  return <AuthContext.Provider value={{ signIn, signUp, user: data.user, signOut, updateProfile }}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const content = useContext(AuthContext);
  return content;
}

export { AuthProvider, useAuth };
