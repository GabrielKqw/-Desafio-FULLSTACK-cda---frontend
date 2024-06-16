import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../services/api";
import { RoutesPath } from "../../routes";
import CardComponent from "../../components/card/CardComponent";
import AchievementsCard from "../../components/AchievementsCard/AchievementsCard"; // Adicione esta linha

interface UserProfile {
  name: string;
  nickname: string;
  rank: string;
  profileImage?: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [formData, setFormData] = useState<UserProfile>();
  const [isEditing, setIsEditing] = useState(false);
  const [showReceiveAchievementButton, setShowReceiveAchievementButton] =
    useState(true);

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
        if (rank === "GOLD") {
          setShowReceiveAchievementButton(false);
        }
      } catch (error) {
        console.error("Falha ao buscar perfil do usuário:", error);
        navigate(RoutesPath.LOGIN);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
    setShowReceiveAchievementButton(false);
  };

  const handleReceiveAchievement = async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      const userId = localStorage.getItem("userId");

      if (!jwt || !userId) {
        navigate(RoutesPath.LOGIN);
        return;
      }

      const response = await Api.get(`/user/${userId}`);
      const { rank } = response.data;

      if (rank === "BRONZE") {
        await Api.patch(`/user/${userId}`, { rank: "PRATA" });
        setUserProfile((prevState) =>
          prevState ? { ...prevState, rank: "PRATA" } : undefined
        );
      } else if (rank === "PRATA") {
        await Api.patch(`/user/${userId}`, { rank: "GOLD" });
        setUserProfile((prevState) =>
          prevState ? { ...prevState, rank: "GOLD" } : undefined
        );
        setShowReceiveAchievementButton(false);
      }

      alert("Conquista recebida com sucesso!");
    } catch (error) {
      console.error("Falha ao receber conquista:", error);
      alert("Erro ao receber conquista. Tente novamente mais tarde.");
    }
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
        name: formData?.name || "",
        nickname: formData?.nickname || "",
        profileImage: formData?.profileImage || "",
      };

      await Api.patch(`/user/${userId}`, updatedData);
      console.log("upddate ->", updatedData);
      setUserProfile({
  rank:userProfile?.rank,

        name: updatedData.name as string,
        nickname: updatedData.nickname as string,
        profileImage: updatedData.profileImage as string,
      } as UserProfile
    );
      setIsEditing(false);
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Falha ao atualizar perfil do usuário:", error);
      alert("Erro ao atualizar perfil. Tente novamente mais tarde.");
    }
  };

  return (
    <>
      {userProfile ? (
        <div className="dashboard-container">
          <CardComponent>
            <div className="profile-container">
              {showReceiveAchievementButton && (
                <button className="rank" onClick={handleReceiveAchievement}>
                  🏆 Pegar Conquista
                </button>
              )}
              {!isEditing ? (
                <>
                  <p>Seja bem vindo, {userProfile.name}!</p>
                  <p>Nickname: {userProfile.nickname}</p>
                  <p>Rank: {userProfile.rank}</p>
                  {userProfile.profileImage && (
                    <img
                      src={userProfile.profileImage}
                      alt="Imagem de Perfil"
                    />
                  )}
                  <button
                    className="responsive-button"
                    onClick={handleEditProfile}
                  >
                    Editar Perfil
                  </button>
                </>
              ) : (
                <form onSubmit={handleSubmit}>
                  <label>
                    Nome:
                    <input
                      className="responsive-input"
                      type="text"
                      value={formData?.name || ""}
                      onChange={(e) =>
                        setFormData((prevState) =>
                          prevState
                            ? { ...prevState, name: e.target.value }
                            : undefined
                        )
                      }
                      required
                    />
                  </label>

                  <label>
                    Nickname:
                    <input
                      className="responsive-input"
                      type="text"
                      value={formData?.nickname || ""}
                      onChange={(e) =>
                        setFormData((prevState) =>
                          prevState
                            ? { ...prevState, nickname: e.target.value }
                            : undefined
                        )
                      }
                      required
                    />
                  </label>

                  <label>
                    Imagem de Perfil:
                    <input
                      className="responsive-input"
                      type="text"
                      value={formData?.profileImage || ""}
                      onChange={(e) =>
                        setFormData((prevState) =>
                          prevState
                            ? { ...prevState, profileImage: e.target.value }
                            : undefined
                        )
                      }
                    />
                  </label>

                  <button className="responsive-button" type="submit">
                    Salvar Alterações
                  </button>
                </form>
              )}
            </div>
          </CardComponent>
          <AchievementsCard rank={userProfile.rank} />
        </div>
      ) : (
        <p>Carregando perfil...</p>
      )}
    </>
  );
};

export default Dashboard;
