import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function IsUser({ children }) {
  const { isLoading, user } = useContext(AuthContext);

  // If the authentication is still loading
  if (isLoading) return <p>Loading ...</p>;

  if (user.role == "USER") {
    return children;
  }
}
export default IsUser;
