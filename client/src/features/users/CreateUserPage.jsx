import Form from "../../ui/Form";
import { createUser } from "./usersSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateUserPage() {
  const { lastActionType, lastActionPayload, loading, error } = useSelector(
    (state) => state.users
  );
  const navigate = useNavigate();

  useEffect(() => {
    console.log(lastActionType, lastActionPayload, loading, error);
    if (!loading && lastActionType?.includes("users/createUser")) {
      if (error) {
        window.alert(error);
      } else if (lastActionPayload?.message === "User created") {
        window.confirm("Successfully Registered, go to login?")
          ? navigate("/login", { replace: true })
          : window.location.reload();
      }
    }
  });

  const formValidations = {
    username: {
      label: "username",
      type: "text",
      pattern: "[a-zA-Z0-9]{6,}",
      failedMessage: "username must contain at least 6 characters",
    },
    email: {
      label: "email",
      type: "email",
      failedMessage: "Not a valid email",
    },
    role: {
      type: "radio",
      selections: ["regular", "admin"],
      label: "Select an role: ",
    },
    password: {
      label: "password",
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
        formName="Sign Up"
        formValidations={formValidations}
        dispatchAction={createUser}
      />
      <div className="text-center m-3">
        <button
          type="button"
          className="btn btn-secondary"
          onMouseDown={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default CreateUserPage;
