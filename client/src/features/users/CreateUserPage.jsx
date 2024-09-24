import Form from "../../ui/Form";
import { createUser } from "./usersSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function CreateUserPage() {
  const { lastActionPayload } = useSelector((state) => state.users);

  useEffect(() => {
    console.log(lastActionPayload);
    lastActionPayload?.message && window.alert(lastActionPayload?.message);
  }, [lastActionPayload]);

  const formValidations = {
    username: {
      type: "text",
      pattern: "[a-zA-Z0-9]{6,}",
      failedMessage: "username must contain at least 6 characters",
    },
    email: {
      type: "email",
      failedMessage: "Not a valid email",
    },
    role: {
      type: "radio",
      selections: ["regular", "admin"],
      label: "Select an role: ",
    },
    password: {
      type: "password",
      pattern: "(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{8,})",
      failedMessage:
        "Password must be at least 8 characters long and contain combinations of numbers and characters",
    },
  };

  return (
    <Form
      formName="Sign Up"
      fields={["username", "email", "role", "password"]}
      formValidations={formValidations}
      dispatchAction={createUser}
    />
  );
}

export default CreateUserPage;
