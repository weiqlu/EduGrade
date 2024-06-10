import React from "react";
import axios from "axios";

function ClassList() {
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/api/connection")
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("Error connecting to the backend", error);
      });
  }, []);

  return (
    <div>
      <p> TEST </p>
      <p> {message} </p>
    </div>
  );
}

export default ClassList;