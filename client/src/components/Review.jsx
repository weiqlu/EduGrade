import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import swal from "sweetalert";
import "../styles/Review.css";
import "primeicons/primeicons.css";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";

function Review() {
  const [crn, setCrn] = React.useState("");
  const [section, setSection] = React.useState(null);
  const [review, setReview] = React.useState("");
  const [reviews, setReviews] = React.useState([]);
  const [status, setStatus] = React.useState(localStorage.getItem("status"));

  React.useEffect(() => {
    if (!status) {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        setStatus(decoded.status);
      }
    }
  }, [status]);

  const handleSearch = async () => {
    try {
      const sectionResponse = await axios.get(
        `http://localhost:5000/sections/${crn}`
      );
      const reviewsResponse = await axios.get(
        `http://localhost:5000/reviews/${crn}`
      );
      setSection(sectionResponse.data);
      setReviews(reviewsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      swal("", "Error fetching data", "error");
    }
  };

  const handleSubmitReview = async () => {
    const username = localStorage.getItem("username");
    try {
      await axios.post("http://localhost:5000/reviews", {
        crn,
        review,
        username,
      });
      swal("Success", "Review submitted", "success");
      setReview("");
      handleSearch();
    } catch (error) {
      console.error("Error submitting review:", error);
      swal("", "Please enter a review", "error");
    }
  };

  const handleDeleteReview = async (username, crn) => {
    try {
      await axios.delete(`http://localhost:5000/reviews/${username}/${crn}`);
      swal("Success", "Review deleted", "success");
      handleSearch();
    } catch (error) {
      console.error("Error deleting review:", error);
      swal("", "Error deleting review", "error");
    }
  };

  const handleEditReview = async (username, crn) => {
    const newReview = prompt("Enter your new review:");

    if (newReview) {
      try {
        await axios.put(`http://localhost:5000/reviews/${username}/${crn}`, {
          review: newReview,
        });
        alert("Review updated successfully");
        handleSearch();
      } catch (error) {
        console.error("Error updating review:", error);
        alert("Error updating review");
      }
    }
  };

  return (
    <div className="review-wrapper">
      <div className="review-container">
        <div className="review-header">
          <h2 className="review-title">Review Page</h2>
          <div className="review-search">
            <FloatLabel>
              <InputText
                id="crn-input"
                value={crn}
                onChange={(e) => setCrn(e.target.value)}
                className="review-input"
              />
              <label htmlFor="crn-input">Section CRN</label>
            </FloatLabel>
            <Button
              icon="pi pi-search"
              severity="help"
              aria-label="Search"
              onClick={handleSearch}
              className="review-search-button"
            />
          </div>
        </div>

        {section && (
          <div className="review-section-info">
            <h3>Section Information</h3>
            <p>
              <strong>Subject:</strong> {section.subject}
            </p>
            <p>
              <strong>Number:</strong> {section.number}
            </p>
            <p>
              <strong>Instructor:</strong> {section.instructor}
            </p>
            <p>
              <strong>Term:</strong> {section.term}
            </p>
            <p>
              <strong>Year:</strong> {section.year}
            </p>
          </div>
        )}

        {section && (
          <div className="review-submit-box">
            <div className="review-submit">
              <h3>Submit a Review</h3>
              <InputTextarea
                autoResize
                value={review}
                onChange={(event) => setReview(event.target.value)}
                rows={5}
                cols={30}
                className="review-textarea"
              />
              <button onClick={handleSubmitReview} className="review-button">
                Submit
              </button>
            </div>
          </div>
        )}

        {reviews.length > 0 && (
          <div className="review-list-box">
            <div className="review-list">
              <h3>Reviews</h3>
              {reviews.map((rev) => (
                <div key={`${rev.username}-${rev.crn}`} className="review-item">
                  <p>
                    <strong>{rev.username}</strong>: {rev.review}
                  </p>
                  {status === "admin" && (
                    <div className="review-actions">
                      <button
                        onClick={() => handleEditReview(rev.username, rev.crn)}
                        className="review-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteReview(rev.username, rev.crn)}
                        className="review-button"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Review;