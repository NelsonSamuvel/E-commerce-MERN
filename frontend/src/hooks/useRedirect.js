import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const useRedirect = (userInfo) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect, { replace: true });
    }
  }, [userInfo, redirect, navigate]);
};

export { useRedirect };
