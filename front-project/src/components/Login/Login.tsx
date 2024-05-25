import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "../../GlobalCss/Global.css";
import { Link } from "react-router-dom";
import { CustomButton } from "../CustomButton/CustomButton";
import  CustomInput  from "../CustomInput/CustomInput";

const Login = () => {
  // Estados para armazenar as entradas do usuário
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Função que é chamada quando o formulário é enviado
  // const handleSubmit = (event) => {
  //   // Impede que a página seja recarregada
  //   event.preventDefault();

  //   // Faz o console log das credenciais do usuário
  //   console.log("Dados de Login:", { username, password });
  // };

  return (
    <div className="container">
      <form>
        <h1>Login</h1>
        <div className="input-field">
          <CustomInput
            type="text"
            placeholder="E-mail"
            value={username}
            onChange={setUsername}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <CustomInput
            type="password"
            placeholder="Senha"
            value={password}
            onChange={setPassword}
          />
          <FaLock className="icon" />
        </div>

        <div className="recall-forget">
          <Link to="/forgot-password">Esqueceu sua senha?</Link>
        </div>
        <CustomButton label="Login"/>
        <div className="signup-link">
          <p>
            Não tem uma conta? <Link to="/register">Registrar</Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;