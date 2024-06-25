import "../styles/Account.css";
import React from "react";
import swal from "sweetalert";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import axios from "axios";

function Account() {
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [response, setResponse] = React.useState("");

  const handlePassword = async () => {
    // Check Textfields
    if (password === "") {
      setResponse("Please enter your original password.");
    } else if (newPassword === "") {
      setResponse("Please enter your desired, new password.");
    } else {
      try {
        // Verify Old Password
        const verifyResponse = await axios.get(`http://localhost:5000/match`, {
          params: {
            username: localStorage.getItem("username"),
            password: password,
          },
        });
        const match = verifyResponse.data;
        console.log("Password match: ", match);

        // Update with new password
        if (match) {
          await axios.put(
            `http://localhost:5000/password/${localStorage.getItem(
              "username"
            )}`,
            {
              newPassword: newPassword,
            }
          );
          swal("Success", "Password Updated", "success");
          setPassword("");
          setNewPassword("");
          setVisible(false);
          setResponse("");
        } else {
          setResponse("Old password does not match.");
        }
      } catch (error) {
        console.error("Error handling password change: ", error);
        setResponse("Error updating password. Please try again later.");
      }
    }
  };

  return (
    <div className="account-container">
      <h2>Account Information</h2>
      <p>Username: {localStorage.getItem("username")}</p>
      <Button
        label="Change Password"
        onClick={() => setVisible(true)}
        raised
        rounded
      />
      <Dialog
        header="Change Your Password"
        visible={visible}
        style={{ width: "500px" }}
        onHide={() => setVisible(false)}
        footer={
          <Button label="Confirm" onClick={handlePassword} raised rounded />
        }
      >
        <div className="old-container">
          <label htmlFor="oldPassword">Old Password</label>
          <InputText
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <small>Enter your old password to reset it.</small>
        </div>
        <div className="new-container">
          <label htmlFor="newPassword">New Password</label>
          <InputText
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <small>Enter your new password.</small>
        </div>
        <small className="small-error">{response}</small>
      </Dialog>
    </div>
  );
}

export default Account;
