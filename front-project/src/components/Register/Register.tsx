import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "../../GlobalCss/Global.css";
import { Link } from "react-router-dom";
import { CustomButton } from "../CustomButton/CustomButton";
import CustomInput from "../CustomInput/CustomInput";

const Login = () => {
  // Estados para armazenar as entradas do usuário
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
        <h1>Crie seu usuário</h1>
        <div className="input-field">
          <CustomInput
            type="text"
            placeholder="Nome Completo"
            value={name}
            onChange={setName}
          />
          <FaUser className="icon" />
        </div>
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
        <div className="input-field">
          <CustomInput
            type="password"
            placeholder="Confirme a senha"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
          <FaLock className="icon" />
        </div>
        <CustomButton label="Cadastrar"/>
        <div className="signup-link">
          <p>
            Já tem uma conta? <Link to="/">Login</Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;