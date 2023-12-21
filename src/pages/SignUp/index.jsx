import { useState } from "react";

import { Container, Form, Background } from "./styles";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { api } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSignUp() {
    if (!name || !email || !password) {
      return alert("Por favor preencha todos os campos!");
    }
    api
      .post("/users", { name, email, password })
      .then(() => {
        alert("Usuário cadastrado com sucesso!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Não foi possivel cadastrar!");
        }
      });
  }

  return (
    <Container>
      <Background />
      <Form>
        <h1>Minhas Notas</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Crie sua conta</h2>
        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="E-mail"
          type="text"
          autoComplete={"username".toString()}
          icon={FiMail}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          title="Cadastrar"
          onClick={handleSignUp}
        />
        <Link to="/">Voltar para o Login</Link>
      </Form>
    </Container>
  );
}
