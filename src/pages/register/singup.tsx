import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { RegisterUser } from "../../services/interfaces";
import { RegisterService } from "../../services/authService";
import swal from "sweetalert";

const SingUp = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/login')
  }

  const [values, setValues] = useState<RegisterUser>({
    name: "",
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
    cpf: "",
  });

  const handleChangesValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((values: RegisterUser) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegisterUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const response: any = await RegisterService.Register(values);

    if (!response) {
      swal({
        title: "Erro de Cadastro",
        text: "Informações incorretas!",
        icon: "error",
        timer: 6000,
      });
    }

    const jwt = response.data.token;

    if (!jwt) {
      swal({
        title: "Error!",
        text: `${response.data.message}`,
        icon: "error",
        timer: 6000,
      });
    }

    localStorage.setItem("jwt", jwt);
    swal({
      title: "Usuário cadastrado com sucesso!",
      icon: "success",
      timer: 6000,
    });

    navigate("/login");
  };

  return (
    <div className="singup">
      {/* <ReturnPage Route={() => navigate(-1)} /> */}

      <section className="singup-section">
        <h2 className="singup-h2">User registration</h2>

        <form className="singup-form" onSubmit={handleRegisterUser}>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Enter your Name'
            required
            onChange={handleChangesValues}
          />
          <input
            type='text'
            name='nickname'
            id='nickname'
            placeholder=' your nickname'
            required
            onChange={handleChangesValues}
          />
          <input
            type='email'
            name='email'
            id='email'
            placeholder=' Enter your Email'
            required
            onChange={handleChangesValues}
          />

          <input
            type='text'
            name='cpf'
            id='cpf'
            placeholder=' Put your CPF'
            required
            onChange={handleChangesValues}
          />

          <input
            type='password'
            name='password'
            id='password'
            placeholder=' Enter a password'
            required
            onChange={handleChangesValues}
          />

          <input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            placeholder=' Confirm your password'
            required
            onChange={handleChangesValues}
          />

          <button type='submit'>Register</button>
        </form>
      </section>
    </div>
  );
};

export default SingUp;