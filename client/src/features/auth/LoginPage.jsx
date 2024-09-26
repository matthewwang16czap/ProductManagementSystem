import Form from "../../ui/Form";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "./authSlice";
import { getUser } from "../users/usersSlice";

function CreateUserPage() {
  const { lastActionType, lastActionPayload, loading, error } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (!loading && lastActionType?.includes("auth/login")) {
      if (error) {
        window.alert(error);
      } else if (lastActionPayload) {
        // refresh user state
        dispatch(getUser());
        // back to from
        navigate(from, { replace: true });
      }
    }
  });

  const formValidations = {
    account: {
      label: "username or email",
      type: "text",
      pattern: ".{6,}",
      failedMessage: "account must contain at least 6 characters",
    },
    password: {
      label: "password",
      type: "password",
      pattern:
        "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])([a-zA-Z0-9!@#$%^&*]{8,})",
      failedMessage: `wrong password`,
    },
  };

  return (
    <div className="login-page">
      <Form
        formName="Login"
        formValidations={formValidations}
        dispatchAction={login}
      />
      <div className="text-center m-3">
        <button
          type="button"
          className="btn btn-secondary"
          onMouseDown={() => navigate("/user/signup")}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}

export default CreateUserPage;
