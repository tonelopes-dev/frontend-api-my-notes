import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { Container, Form, Avatar } from "./styles";

import { api } from "../../services/api";

import avatarPlaceholder from "../../assets/avatar_placeholder.svg";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera, FiCheck } from "react-icons/fi";

export function Profile() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [loading, setLoading] = useState(false);

  const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

  const [avatar, setAvatar] = useState(avatarURL);
  const [avatarFile, setAvatarFile] = useState(null);

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  async function handleUpdateProfile() {
    const updated = {
      name,
      email,
      password: newPassword,
      old_password: oldPassword,
    };
    const userUpdated = Object.assign(user, updated);
    setLoading(true);
    await updateProfile({ user: userUpdated, avatarFile });
    setLoading(false);

    navigate("/");
  }

  function handleChangeAvatar(event) {
    event.preventDefault();

    const file = event.target.files[0];
    setAvatarFile(file);

    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);

    setLoading(false);
  }

  return (
    <Container>
      <header>
        <button
          onClick={handleBack}
          type="button"
        >
          <FiArrowLeft size={24} />
        </button>
      </header>
      <Form>
        <Avatar>
          <img
            src={avatar}
            alt="foto do usuario"
          />
          <label htmlFor="avatar">
            <FiCamera />
            <input
              id="avatar"
              type="file"
              onChange={handleChangeAvatar}
            />
          </label>
        </Avatar>
        <Input
          placeholder="Nome"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          icon={FiUser}
        />
        <Input
          placeholder="E-mail"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={FiMail}
        />
        <Input
          placeholder="Senha atual"
          type="password"
          onChange={(e) => setOldPassword(e.target.value)}
          icon={FiLock}
        />
        <Input
          placeholder="Nova senha"
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
          icon={FiCheck}
        />
        {loading ? (
          <Button
            title="Carregando..."
            disabled
          />
        ) : (
          <Button
            title="Salvar"
            onClick={handleUpdateProfile}
          />
        )}
      </Form>
    </Container>
  );
}
