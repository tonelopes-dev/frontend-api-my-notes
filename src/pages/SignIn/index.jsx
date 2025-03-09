import { Container, Form, Background } from "./styles";
import { FiMail, FiLock } from "react-icons/fi";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { Link } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../../hooks/auth";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleSingIn() {
    setLoading(true);
    await signIn({ email, password });
    setLoading(false);
  }

  return (
    <Container>
      <Form>
        <h1>Minhas Notas</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Faça seu Login</h2>
        <Input
          placeholder="E-mail"
          type="text"
          autoComplete="username"
          onChange={(e) => setEmail(e.target.value)}
          icon={FiMail}
        />

        <Input
          placeholder="Senha"
          type="password"
          autoComplete="current-password"
          icon={FiLock}
          onChange={(e) => setPassword(e.target.value)}
        />
        {loading ? (
          <Button
            title="Carregando..."
            disabled
          />
        ) : (
          <Button
            title="Entrar"
            onClick={handleSingIn}
          />
        )}
        <Link to="/register">Criar conta</Link>
      </Form>
      <Background />
    </Container>
  );
}
