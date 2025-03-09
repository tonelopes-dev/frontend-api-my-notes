import { Container, Form, Background } from "./styles";
import { FiMail, FiLock } from "react-icons/fi";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false); // Novo estado
  const navigate = useNavigate();

  async function handleSingIn() {
    setLoading(true);
    setError("");
    try {
      await signIn({ email, password });
      localStorage.removeItem("@myappnotes:userUp");
      navigate("/sua-pagina-principal");
    } catch (err) {
      setError("Credenciais inválidas. Verifique seu e-mail e senha.");
      console.error("Erro ao fazer login:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    function loadStorageData() {
      const userString = localStorage.getItem("@myappnotes:userUp");
      if (userString) {
        try {
          const user = JSON.parse(userString);
          if (user && user.email && user.password) {
            setEmail(user.email);
            setPassword(user.password);
          }
        } catch (error) {
          console.error("Erro ao analisar JSON do localStorage:", error);
        } finally {
          setDataLoaded(true); // Indica que os dados foram carregados
        }
        localStorage.removeItem("@myappnotes:userUp");
      } else {
        setDataLoaded(true); // Indica que os dados foram carregados, mesmo que não existam
      }
    }
    loadStorageData();
  }, []);

  return (
    <Container>
      <Form>
        <h1>Minhas Notas</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>
        <h2>Faça seu Login</h2>
        {dataLoaded && ( // Renderiza os inputs apenas após os dados serem carregados
          <>
            <Input
              placeholder="E-mail"
              type="text"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={FiMail}
            />
            <Input
              placeholder="Senha"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={FiLock}
            />
          </>
        )}
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Link to="/register">Criar conta</Link>
      </Form>
      <Background />
    </Container>
  );
}
