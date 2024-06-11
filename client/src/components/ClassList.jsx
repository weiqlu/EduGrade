import React from "react";
import axios from "axios";
import "../styles/ClassList.css";

function ClassList() {
  const [classes, setClasses] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("https://edugrade-backend.onrender.com/sections")
      .then((response) => {
        const data = response.data; // Axios automatically parses the JSON response
        const formattedData = data.map((item) => ({
          ...item,
          subjectNumber: `${item.subjects} ${item.numbers} ${item.instructor}`,
          subjectNumberWithInstructor: `${item.subjects}${item.numbers}${item.instructor}`,
          yearAndTerm: `${item.years}${item.term}`,
          yearAndTerm2: `${item.years} ${item.term}`,
        }));
        setClasses(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="classlist-container">
      <h2>Class List</h2>
      <ul>
        {classes.map((item, index) => (
          <li key={index}>
            {item.subjectNumber} - {item.yearAndTerm2}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClassList;
