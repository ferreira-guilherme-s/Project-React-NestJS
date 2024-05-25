import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import Modal from '../Modal/Modal';
import { CustomButton } from '../CustomButton/CustomButton';

interface User {
  id: string;
  name: string;
  email: string;
}

const HomePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleCreate = () => {
    setModalTitle('Criar Usuário');
    setSelectedUser(null);
    setIsModalOpen(true);
  }

  const handleEdit = async (id: string) => {
    setModalTitle('Editar Usuário');
    const response = await axios.get(`http://localhost:3000/users/getUser/:${id}`);
    console.log(response);
    if(response.status === 200) {
      setSelectedUser(response.data);
    } else {
      alert("Erro ao buscar usuário");
    }
    setIsModalOpen(true);
  }
  const handleCloseModal = () => {
    setIsModalOpen(false);
  }
  const handleDelete = async (id: string) => {
    const response = await axios.delete(`http://localhost:3000/users/deleteUser/:${id}`);
    if(response.status === 200) {
      window.location.reload();
    } else {
      alert("Erro ao deletar usuário");
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/getAllUsers');
        if (response.data.success && Array.isArray(response.data.data.users)) {
          setUsers(response.data.data.users);
        } else {
          console.error('Erro: a resposta da API não é um array');
        }
      } catch (error) {
        console.error('Erro ao buscar usuários', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button onClick={handleCreate} className="create-button">
        <FiPlus /> Criar Usuário
      </button>

      <table className="user-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            console.log(user),
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user.id)}>
                  <FiEdit2 />
                </button>
                <button onClick={() => handleDelete(user.id)}>
                  <FiTrash2 />
                </button>
      </td>
            </tr>
          ))}
        </tbody>
      </table>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2>{modalTitle}</h2>
          {selectedUser && selectedUser.name ? (
            <>
            <form>
              <input className='modal-input' type="text" defaultValue={ selectedUser.name } />
              <input className='modal-input' type="email" defaultValue={ selectedUser.email } />
            </form>
            </>) : (
            <>
            <form>
              <input type="text" placeholder="Nome" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Senha" />
              <input type="password" placeholder="Confirme a senha" />
              <CustomButton label="Salvar" />
            </form>
            </>
            )}
        </Modal>
      </div>
    </>
  );
};

export default HomePage;