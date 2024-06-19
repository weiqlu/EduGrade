/* eslint-disable react/no-unescaped-entities */
import "../styles/User.css";
import React from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";

function User() {
  const [users, setUsers] = React.useState([]);
  const [selectedUsers, setSelected] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
        setIsLoading(false);
      });
  }, []);

  const handleAdmin = () => {
    selectedUsers.forEach((user) => {
      axios
        .put(`http://localhost:5000/users/${user.username}`, {
          status: "admin",
        })
        .then(() => {
          setUsers((prevUsers) =>
            prevUsers.map((u) =>
              u.username === user.username ? { ...u, status: "admin" } : u
            )
          );
        })
        .catch((error) => {
          console.error("Error updating user status: ", error);
        });
    });

    setSelected([]);
  };

  const handleDelete = () => {
    selectedUsers.forEach((user) => {
      axios
        .delete(`http://localhost:5000/users/${user.username}`)
        .then(() => {
          setUsers((prevUsers) =>
            prevUsers.filter((u) => u.username !== user.username)
          );
        })
        .catch((error) => {
          console.error("Error deleting user: ", error);
        });
    });

    setSelected([]);
  };

  return (
    <div className="user-container">
      <h2>User List</h2>
      <p>Here's a list of the website's manageable users</p>
      <div className="button-container">
        <Button
          label="Make Admin"
          onClick={handleAdmin}
          severity="help"
          raised
          rounded
        />
        <Button
          label="Delete"
          onClick={handleDelete}
          severity="danger"
          raised
          rounded
        />
      </div>
      <DataTable
        value={users}
        selection={selectedUsers}
        onSelectionChange={(e) => setSelected(e.value)}
        dataKey="username"
        loading={isLoading}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column field="username" header="Username"></Column>
        <Column field="status" header="Status"></Column>
      </DataTable>
    </div>
  );
}

export default User;
