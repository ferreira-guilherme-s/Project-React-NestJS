import axios from 'axios';

export const createUser = async (user: { name: string, email: string, password: string }) => {
  const response = await axios.post(`http://localhost:3000/users/insertUser`, user);
  console.log(response);
  if(response.status === 201) {
    return response.status;
  } else {
    throw new Error("Erro ao criar usuário");
  }
}