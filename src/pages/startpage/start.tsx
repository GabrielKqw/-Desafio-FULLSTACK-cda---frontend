import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Initial,
  Heading,
  IconConfig,
  Logins,
  Content,
  PrimaryFooter,
  DivFooter,
  SecondaryFooter,
} from "./StartPage.styles.ts";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Initial>
      <Heading>
        <IconConfig>
          <p>
            Cidade
            <img src="path_to_your_image" alt="Icon" />
            Alt
          </p>
        </IconConfig>
        <Logins>
          <p onClick={() => navigate("/login")}>Entrar</p>
        </Logins>
      </Heading>
      <Content>
        <p className="text1">Bem-vindo ao GTA Cidade!</p>
        <p className="text2">Explore a cidade mais viva do universo GTA.</p>
        <p className="text3">Divirta-se e descubra novas aventuras.</p>
      </Content>
      <PrimaryFooter>
        <DivFooter>
          <h5>Empresa</h5>
          <p>Quem somos</p>
        </DivFooter>
        <DivFooter>
          <h5>Contato</h5>
          <p>Email: contato@empresa.com</p>
        </DivFooter>
        <DivFooter>
          <h5>FAQ</h5>
          <p>Perguntas frequentes</p>
        </DivFooter>
        <DivFooter>
          <h5>Dicas</h5>
          <p>Dicas para iniciantes</p>
        </DivFooter>
      </PrimaryFooter>
      <SecondaryFooter>
        <p>© 2024 • GTA cda • Todos os direitos reservados</p>
      </SecondaryFooter>
    </Initial>
  );
};

export default Home;
