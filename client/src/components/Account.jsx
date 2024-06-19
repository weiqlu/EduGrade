import "../styles/Account.css";
import React from "react";

function Account() {
    const [password, setOld] = React.useState("");
    const [newPassword, setNew] = React.useState("");

    return (
        <div className="account-container">
            <h2>Account Information</h2>
            {/* <p>Username: {localStorage.getItem("username")}</p> */}
        </div>
    )
}

export default Account;