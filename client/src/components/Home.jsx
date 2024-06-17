import "../styles/Home.css";
import { Image } from "primereact/image";

function Home() {
  return (
    <div className="home-container">
      <h2>Picking Classes Just Got Easier</h2>
      <h3>Learn About Official Grades From Professors of Previous Semesters</h3>
      
      <div className="distribution-container">
        <h4>Inspect the numerous course sections based on the CRN, instructor, subject, GPA, course title, course number, or term!</h4>
        <Image src="/EduGrade_ClassList.jpg" alt="Image" width="1000" />
      </div>

      <div className="review-container">
        <Image src="/EduGrade_Review.jpg" alt="Image" width="1000" />
        <h4>Look at a course section's reviews made by other users, or even leave one of your own!</h4>
      </div>
    </div>
  );
}

export default Home;
