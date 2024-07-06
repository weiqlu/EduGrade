/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import "../styles/Home.css";
import React from "react";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <h2>Picking Classes Just Got Easier!</h2>
      <h3>Learn About Official Grades From Professors of Previous Semesters</h3>

      <div className="distribution-container">
        <h4>
          Inspect the numerous course sections based on the CRN, instructor,
          subject, GPA, course title, course number, or term!
        </h4>
        <Image src="/EduGrade_ClassList.jpg" alt="Image" width="1000" />
      </div>

      <div className="second-container">
        <Image src="/EduGrade_Review.png" alt="Image" width="1000" />
        <h4>
          Look at a course section's reviews made by other users, or even leave
          one of your own!
        </h4>
      </div>

      <div className="features-container">
        <h3>Why EduGrade?</h3>
        <ul>
          <li>
            Access detailed grade distributions for informed decision-making
          </li>
          <li>
            Filter courses by various criteria such as CRN, instructor, and GPA
          </li>
          <li>Read and write anonymous reviews for course sections</li>
          <li>Easy-to-use interface for a seamless experience</li>
        </ul>
      </div>

      <div className="cta-container">
        <h3>Get Started Today!</h3>
        <Link to="/ClassList">
          <Button
            label="Explore Courses"
            icon="pi pi-search"
            className="p-button-raised p-button-rounded p-button-success"
          />
        </Link>
        <Link to="/Review">
          <Button
            label="Write a Review"
            icon="pi pi-pencil"
            className="p-button-raised p-button-rounded p-button-info"
          />
        </Link>
      </div>
    </div>
  );
}

export default Home;
