import { Children, useContext } from "react";
import { AuthContext } from "../context/auth.context";

function IsOwner({ children }) {
  const { isLoading, user } = useContext(AuthContext);

  // If the authentication is still loading
  if (isLoading) return <p>Loading ...</p>;

  if (user.role == "OWNER") {
    return children;
  }
}
export default IsOwner;
