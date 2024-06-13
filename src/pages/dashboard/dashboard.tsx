import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../services/api";
import { RoutesPath } from "../../routes";

interface UserProfile {
  name: string;
  nickname: string;
  rank: string;
  profileImage?: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const jwt = localStorage.getItem("jwt");
        const userId = localStorage.getItem("userId");

        if (!jwt || !userId) {
          navigate(RoutesPath.LOGIN);
          return;
        }

        const response = await Api.get(`/user/${userId}`);
        const { name, nickname, rank, profileImage } = response.data;

        setUserProfile({ name, nickname, rank, profileImage });
        setFormData({ name, nickname, rank, profileImage });
      } catch (error) {
        console.error('Falha ao buscar perfil do usuário:', error);
        navigate(RoutesPath.LOGIN);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const jwt = localStorage.getItem("jwt");
      const userId = localStorage.getItem("userId");

      if (!jwt || !userId) {
        navigate(RoutesPath.LOGIN);
        return;
      }

      const updatedData = {
        name: formData!.name,
        nickname: formData!.nickname,
        profileImage: formData!.profileImage,
      };

      await Api.patch(`/user/${userId}`, updatedData);

      setUserProfile(updatedData as UserProfile);
      setIsEditing(false);
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error('Falha ao atualizar perfil do usuário:', error);
      alert("Erro ao atualizar perfil. Tente novamente mais tarde.");
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {userProfile ? (
        <>
          {!isEditing ? (
            <>
              <p>Bem-vindo ao seu dashboard, {userProfile.name}!</p>
              <p>Nickname: {userProfile.nickname}</p>
              <p>Rank: {userProfile.rank}</p>
              {userProfile.profileImage && (
                <img src={userProfile.profileImage} alt="Imagem de Perfil" />
              )}
              <button onClick={handleEditProfile}>Editar Perfil</button>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <label>
                Nome:
                <input
                  type="text"
                  value={formData!.name}
                  onChange={(e) =>
                    setFormData({ ...formData!, name: e.target.value })
                  }
                  required
                />
              </label>

              <label>
                Nickname:
                <input
                  type="text"
                  value={formData!.nickname}
                  onChange={(e) =>
                    setFormData({ ...formData!, nickname: e.target.value })
                  }
                  required
                />
              </label>

              <label>
                Imagem de Perfil:
                <input
                  type="text"
                  value={formData!.profileImage || ''}
                  onChange={(e) =>
                    setFormData({ ...formData!, profileImage: e.target.value })
                  }
                />
              </label>

              <button type="submit">Salvar Alterações</button>
            </form>
          )}
        </>
      ) : (
        <p>Carregando perfil...</p>
      )}
    </div>
  );
};

export default Dashboard;
