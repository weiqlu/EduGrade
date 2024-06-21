import "../styles/Account.css";
import React from "react";
import swal from "sweetalert";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

function Account() {
    const [password, setOld] = React.useState("");
    const [newPassword, setNew] = React.useState("");
    const [visible, setVisible] = React.useState(false);
    const [response, setResponse] = React.useState("");

    const handlePassword = async () => {
        // Check Textfields
        if (password === "") {
            setResponse("Please enter your original password.");
        }
        else if (newPassword === "") {
            setResponse("Please enter your desired, new password.");
        }
        else {
            // Verify Old Password
            try {
                await axios.get(`http://localhost:5000/match`, {
                    params: {
                        username: localStorage.getItem("username"),
                        password: password
                    }
                }).then(async response => {
                    const match = response.data;
                    console.log("Password match: ", match);
                    
                    // Update with new password
                    if (match) {
                        try {
                            await axios.put(`http://localhost:5000/password/${localStorage.getItem("username")}`, {
                                password: newPassword,
                            });
                            swal("Success", "Password Updated", "success");
                            setOld("");
                            setNew("");
                            setVisible(false);
                            setResponse("");
                        } catch (error) {
                            console.error("Error updating password: ", error);
                            setResponse("Error updating password. Please try again later.");
                        }
                    }
                })
            } catch (error) {
                console.error("Error verifying password: ", error);
                setResponse("Error verifying old password. Please try again later.");
            }
        }
    }
        
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
                onHide={() => {if (!visible) return; setVisible(false); }}
                footer={
                    <Button label="Confirm" onClick={handlePassword} raised rounded />
                }
            >
                    <div className="old-container">
                        <label htmlFor="oldPassword">Old Password</label>
                        <InputText value={password} onChange={(e) => setOld(e.target.value)} />
                        <small>Enter your old password to reset it.</small>
                    </div>
                    <div className="new-container">
                        <label htmlFor="newPassword">New Password</label>
                        <InputText value={newPassword} onChange={(e) => setNew(e.target.value)} />
                        <small>Enter your new password.</small>
                    </div>
                    <small style={{color: "red"}}>{response}</small>
            </Dialog>
        </div>
    )
}

export default Account;
