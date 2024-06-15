import React from "react";
import CardComponent from "../../components/card/CardComponent";

interface UserAchievementsCardProps {
  rank: string;
}

const UserAchievementsCard: React.FC<UserAchievementsCardProps> = ({ rank }) => {
  const getAchievements = (rank: string) => {
    const achievements = [];
    if (rank === "GOLD") {
      achievements.push("🏆 Conquista Ouro");
    }
    if (rank === "PRATA" || rank === "GOLD") {
      achievements.push("🥈 Conquista Prata");
    }
    if (rank === "BRONZE" || rank === "PRATA" || rank === "GOLD") {
      achievements.push("🥉 Conquista Bronze");
    }
    return achievements;
  };

  return (
    <CardComponent>
      <div className="user-achievements-container">
        <h3>Conquistas</h3>
        <ul>
          {getAchievements(rank).map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
      </div>
    </CardComponent>
  );
};

export default UserAchievementsCard;
