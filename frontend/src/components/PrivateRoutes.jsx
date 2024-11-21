import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PrivateRoutes = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to={"login"} />;
};

export default PrivateRoutes;
