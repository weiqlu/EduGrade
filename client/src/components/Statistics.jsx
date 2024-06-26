import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Statistics.css";

const Statistics = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/statistics")
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the statistics!", error);
      });
  }, []);

  return (
    <div className="statistics-container">
      <h3>Did You Know?</h3>
      <ul>
        <li>Average GPA for CS 3114: {stats.avgGPA}</li>
        <li>Minimum GPA for CS 3114: {stats.minGPA}</li>
        <li>Maximum GPA for CS 3114: {stats.maxGPA}</li>
        <li>
          Total number of enrollments in CS 3114: {stats.totalEnrollments}
        </li>
        <li>Number of sections in Spring 2020-21: {stats.sectionCount}</li>
        <li>Total number of sections: {stats.totalSections}</li>
      </ul>
    </div>
  );
};

export default Statistics;
