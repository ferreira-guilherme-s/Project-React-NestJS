import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import Modal from '../Modal/Modal';
import { CustomButton } from '../CustomButton/CustomButton';
import { createUser } from '../../utils/CreateUser';

interface User {
  id: string;
  name: string;
  email: string;
}

const HomePage = () => {
  const [status, setStatus] = useState('loading');
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  //Criação de usuário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


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

  const handleEditUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(selectedUser!== null){
      const response = await axios.put(`http://localhost:3000/users/updateUser/:${selectedUser.id}`, 
      { name: selectedUser.name, email: selectedUser.email});
      if(response.status === 200) {
        window.location.reload();
      } else {
        alert("Erro ao editar usuário");
      }
    }
  }

  const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }
    try {
      const create = await createUser({ name, email, password });
      if(create === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      alert('Erro ao criar usuário');
    }
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

  const token = localStorage.getItem('token');
  console.log('Token do homepage', token);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users/getAllUsers', {
          headers: {
            'auth-token': token
          }
        });
        console.log(response);
        if (response.status === 200) {
          setStatus('success');
          setUsers(response.data.data.users);
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Erro ao buscar usuários', error);
        setStatus('error');
      }
    };

    if (token !== null && token !== '' && token !== undefined) {
      fetchUsers();
    } else {
      setStatus('error');
    }
  }, [token]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error 404: Page not found</div>;
  }

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
          <h2 className='title'>{modalTitle}</h2>
          {selectedUser && selectedUser.name ? (
            <>
            <form onSubmit={handleEditUser}>
              <input type="hidden" defaultValue={ selectedUser.id } />
              <label>Nome</label>
              <input
                className='modal-input'
                type="text"
                value={selectedUser.name}
                onChange={event => setSelectedUser({ ...selectedUser, name: event.target.value })}
              />
              <label>Email</label>
              <input
                className='modal-input'
                type="email"
                value={selectedUser.email}
                onChange={event => setSelectedUser({ ...selectedUser, email: event.target.value })}
              />
              <CustomButton label="Salvar" />
            </form>
            </>) : (
            <>
            <form onSubmit={handleCreateUser}>
              <input className='modal-input-create' type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
              <input className='modal-input-create' type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
              <input className='modal-input-create' type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
              <input className='modal-input-create' type="password" placeholder="Confirme a senha" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              <CustomButton label="Salvar"/>
            </form>
            </>
            )}
        </Modal>
      </div>
    </>
  );
};

export default HomePage;