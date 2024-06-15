import Api from "./api";
import swal from "sweetalert";
import { UserLogin, RegisterUser } from "../services/interfaces";

export const loginService = {
  Login: async (values: UserLogin) => {
    try {
      const res = await Api.post("/auth", values);
      return res.data; // Retorna apenas os dados do response
    } catch (error: any) {
      console.error("Erro ao realizar login:", error);
      swal({
        title: "Error",
        text: `${error.message}`,
        icon: "error",
        timer: 6000,
      });
      throw error; // Lança o erro novamente para que o componente que chama possa tratar, se necessário
    }
  },
};

export const RegisterService = {
  Register: async (values: RegisterUser) => {
    try {
      const res = await Api.post("/user", values);
      return res.data; // Retorna apenas os dados do response
    } catch (error: any) {
      console.error("Erro ao registrar usuário:", error);
      swal({
        title: "Error",
        text: `${error.message}`,
        icon: "error",
        timer: 6000,
      });
      throw error; // Lança o erro novamente para que o componente que chama possa tratar, se necessário
    }
  },
};
