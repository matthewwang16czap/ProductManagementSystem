import Form from "../../ui/Form";
import { updateUser } from "./usersSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ChangePasswordPage() {
  const { user, lastActionType, lastActionPayload, loading, error } = useSelector(
    (state) => state.users
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && lastActionType?.includes("users/updateUser")) {
      if (error) {
        window.alert(error);
      } else if (lastActionPayload?.message === "User updated") {

        window.alert("Successfully update your account");
        navigate("/logout", { replace: true });
      }
    }
    if (!user) {
        navigate("/login", { replace: true, from: location});
    }
  });

  const formValidations = {
    password: {
      label: "new password",
      type: "password",
      pattern:
        "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])([a-zA-Z0-9!@#$%^&*]{8,})",
      failedMessage: `the password must be: \n
      1. Contains at least one digit \n
      2. Contains at least one letter \n
      3. Contains at least one special character from the set !@#$%^&* \n
      4. Is at least 8 characters long `,
    },
  };

  return (
    <div className="signup-page">
      <Form
        formName="Change Password"
        formValidations={formValidations}
        dispatchAction={updateUser}
      />
    </div>
  );
}

export default ChangePasswordPage;
