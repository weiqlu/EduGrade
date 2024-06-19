/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import "../styles/User.css";
import React from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function User() {
  // Dummy data to test Data Table
  const dummyData = [
    {
      id: 1,
      username: "dummy #1",
    },
    {
      id: 2,
      username: "dummy #2",
    },
    {
      id: 3,
      username: "dummy #3",
    },
  ];

  const [users, setUsers] = React.useState(dummyData);
  // const [users, setUsers] = React.useState([]);
  const [selectedUsers, setSelected] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  /**
   * Will retrieve all of the users from the database
   * 
  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        // ...
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
        setIsLoading(false);
      });
  }, []);
  */

  const handleAdmin = () => {
    console.log("Button Clicked!\nSelected users will become admins.");
    // Update permissions for users

    setSelected([]); // Unselect all users
  };

  const handleDelete = () => {
    console.log("Button Clicked!\nSelected users will be deleted.");
    // Remove users from database

    setSelected([]); // Unselect all users
  };

  return (
    // Data Table contains all of the created users
    <div className="user-container">
      <h2>Userlist</h2>
      <p>
        Here's a list of the website's managable users. Administrators can
        delete users or turn users into more admins.
      </p>
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
        dataKey="id"
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column field="username" header="Usernames"></Column>
      </DataTable>
    </div>
  );
}

export default User;
