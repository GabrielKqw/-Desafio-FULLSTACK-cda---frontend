// src/components/StartPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './start.css';

const home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="initial">
      <div className="heading">
        <div className="iconConfig">
          <p>
            Cidade
            <img src="path_to_your_image" alt="Icon" />
            Alt
          </p>
        </div>
        <div className="logins">
          <p onClick={() => navigate('/login')}>Entrar</p>
        </div>
      </div>
      <div className="content">
        <p className="text1"></p>
        <p className="text2"></p>
        <p className="text3">
         
        </p>
      </div>
      <div className="primaryFooter">
        <div className="divFooter">
          <h5>Empresa</h5>
          <p>Quem somos</p>
        </div>
        <div className="divFooter">
          <h5>Contato</h5>
          <p></p>
        </div>
        <div className="divFooter">
          <h5>FAQ</h5>
          <p></p>
        </div>
        <div className="divFooter">
          <h5>Dicas</h5>
          <p></p>
        </div>
      </div>
      <div className="secondaryFooter">
        <p>© 2024 • GTA cda • Todos os direitos reservados</p>
      </div>
    </div>
  );
};

export default home;
