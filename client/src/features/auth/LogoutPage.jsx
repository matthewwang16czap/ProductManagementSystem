import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import { logout } from "./authSlice";
import { getUser } from "../users/usersSlice";

function LogoutPage() {
  const { lastActionType } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (!lastActionType?.includes("auth/logout")) {
      dispatch(logout());
    }
    else {
      dispatch(getUser());
      navigate(from, { replace: true });
    }
  });

  return (
    <div className="logout-page">
      <p>Loging out...</p>
    </div>
  );
}

export default LogoutPage;
