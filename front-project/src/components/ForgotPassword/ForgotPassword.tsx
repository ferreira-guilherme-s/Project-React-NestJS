import { useState } from "react";
import "../../GlobalCss/Global.css";
import './ForgotPassword.css';
import { CustomButton } from "../CustomButton/CustomButton"; 
import CustomInput from "../CustomInput/CustomInput";
import { FaUser } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';
import axios from 'axios';

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const handleEmailSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 4000));
      const response =  true;//await axios.get('sua-url-aqui');
      if (response === true) {
        setShowPasswordInput(true);
      }
    } catch (error) {
      console.error("Erro ao verificar a URL", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    //TODO: Implemente a lógica de envio de senha aqui
  };

  return (
    <div className="container">
      <h1>Recuperação de senha</h1>
      {!loading && !showPasswordInput && (
        <form onSubmit={handleEmailSubmit}>
          <div className="input-field">
            <CustomInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={setEmail}
            />
            <FaUser className="icon" />
          </div>
          <CustomButton label="Enviar" />
        </form>
      )}
      {loading && 
      <div className="loading-container">
        <div className="loading">
          <span></span><span></span><span></span>
        </div>
      </div>
      }
      {showPasswordInput && (
        <form onSubmit={handlePasswordSubmit}>
          <div className="input-field">
            <CustomInput
              type="password"
              placeholder="Nova senha"
              value={password}
              onChange={ setPassword }
            />
          <FaLock className="icon" />
          </div>
          <div className="input-field">
            <CustomInput
              type="password"
              placeholder="Nova senha"
              value={password}
              onChange={ setPassword }
            />
          <FaLock className="icon" />
          </div>
          <CustomButton label="Confirmar senha" />
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;