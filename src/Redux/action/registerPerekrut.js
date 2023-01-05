import axios from "axios";
import swal from "sweetalert";
export const register = (data, navigate) => async (dispact, req, res, next) => {
  try {
    const result = await axios.post(
      "https://hireapp-be-production-e91c.up.railway.app/users/register/company",
      data
    );
    const user = result.data.data;
    console.log(user);
    localStorage.setItem("Token ", user.token);
    dispact({ type: "USER_REGISTER_SUCCESS", payload: user });

    navigate("/verif");

    console.log("user register success");
  } catch (err) {
    console.log("user register fail");
    console.log(err);
  }
};
