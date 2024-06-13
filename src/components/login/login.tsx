import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginService } from "../../services/authService";
import swal from "sweetalert";
import styled, { createGlobalStyle } from "styled-components";
import logoImg from "../../assets/img/logo.png"; // Importa a imagem da logo

// Estilos globais
const GlobalStyle = createGlobalStyle`
  /* Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

  /* Body Styles */
  body {
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(135deg, #1c1c1c, #343434); /* Fundo com gradiente */
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

// Estilos para o componente principal
const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

// Estilos para o container de login
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

// Estilos para a seção de login
const LoginSection = styled.section`
  background-color: rgba(0, 0, 0, 0.7); /* Adiciona um overlay escuro */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  width: 90%;
  max-width: 400px; /* Limitando a largura máxima */
  position: relative;
  overflow: visible; /* Permitir overflow visível */
  padding-top: 20px; /* Espaço para a logo */
`;

// Estilos para o conteúdo do login
const LoginContent = styled.div`
  text-align: center;
`;

// Estilos para a logo
const Logo = styled.div`
  background: url(${logoImg}) no-repeat center top;
  background-size: contain;
  width: 120px; /* Largura da logo */
  height: 120px; /* Altura da logo */
  margin: 0 auto 20px;
`;

// Estilos para o formulário
const FormContainer = styled.div`
  padding: 20px; /* Adiciona espaçamento interno */
`;

// Estilos para os inputs
const Input = styled.input`
  width: calc(100% - 20px); /* Ajusta a largura para considerar o padding */
  padding: 10px;
  margin: 10px 0; /* Maior margem entre inputs */
  border: none;
  background-color: rgba(255, 255, 255, 0.1); /* Altera a cor de fundo dos inputs */
  color: #fff;
  border-radius: 5px;
  border-bottom: 2px solid #555; /* Adiciona uma borda inferior */
  outline: none; /* Remove a borda ao focar */
  transition: all 0.3s ease; /* Adiciona uma transição suave */

  &:focus {
    border-bottom-color: #ffcc00; /* Altera a cor da borda inferior ao focar */
    background-color: rgba(255, 255, 255, 0.2); /* Muda o fundo ao focar */
  }
`;

// Estilos para o botão
const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin: 20px 0; /* Maior margem para os botões */
  border: none;
  background-color: #ffcc00; /* Cor amarela */
  color: #1c1c1c; /* Cor do texto */
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s; /* Adiciona uma transição suave */

  &:hover {
    background-color: #ffdd33; /* Altera a cor ao passar o mouse */
  }
`;

// Estilos para o parágrafo
const Paragraph = styled.p`
  margin-top: 20px;
  color: #fff;
  font-size: 14px;
`;

// Estilos para o link
const StyledLink = styled(Link)`
  color: #ffcc00; /* Cor amarela */
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Login: React.FC = () => {
  const navigation = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChangesValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response: any = await loginService.Login(values);

    if (!response) {
      swal({
        title: "Login Error",
        text: "Invalid username and/or password",
        icon: "error",
        timer: 6000,
      });
    }

    const jwt = response?.data?.token;
    const userId = response?.data?.user?.id;

    if (jwt) {
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("userId", userId);
      swal({
        title: "Welcome",
        icon: "success",
        timer: 3000,
      });
      navigation("/dashboard");
    }
  };

  return (
    <React.Fragment>
      <GlobalStyle />
      <Main>
        <LoginContainer>
          <LoginSection>
            <Logo />
            <LoginContent>
              <FormContainer>
                <form onSubmit={handleLogin}>
                  <Input
                    type='text'
                    name='email'
                    id='email'
                    placeholder='Enter your login email'
                    required
                    value={values.email}
                    onChange={handleChangesValues}
                  />

                  <Input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Enter your access password'
                    required
                    value={values.password}
                    onChange={handleChangesValues}
                  />

                  <Paragraph>
                    You don't have an account created{" "}
                    <strong>
                      <StyledLink to={"/signup"}>Create one here!</StyledLink>
                    </strong>
                  </Paragraph>

                  <Button type='submit'>Login</Button>
                </form>
              </FormContainer>
            </LoginContent>
          </LoginSection>
        </LoginContainer>
      </Main>
    </React.Fragment>
  );
};

export default Login;
