import React from "react";
import "../styles/Review.css";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";

function Review() {
  const [crn, setCrn] = React.useState("");
  const [section, setSection] = React.useState(null);
  const [review, setReview] = React.useState("");
  const [reviews, setReviews] = React.useState([]);

  React.useEffect(() => {
    if (crn) {
      fetch(`http://localhost:5000/reviews/${crn}`)
        .then((response) => response.json())
        .then((data) => {
          setReviews(data);
        })
        .catch((error) => {
          console.error("Error fetching reviews:", error);
        });
    }
  }, [crn]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/sections")
      .then((response) => response.json())
      .then((data) => {
        const foundSection = data.find((sec) => sec.crn === parseInt(crn));
        setSection(foundSection || null);
        setCrn("");
      })
      .catch((error) => {
        console.error("Error fetching section:", error);
      });
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    if (section) {
      const newReview = { crn: section.crn, review };
      fetch("http://localhost:5000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      })
        .then((response) => response.json())
        .then((data) => {
          setReviews([...reviews, data]);
          setReview("");
        })
        .catch((error) => {
          console.error("Error submitting review:", error);
        });
    }
  };

  const handleReviewDelete = (id) => {
    fetch(`http://localhost:5000/reviews/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const newReviews = reviews.filter((review) => review.id !== id);
        setReviews(newReviews);
      })
      .catch((error) => {
        console.error("Error deleting review:", error);
      });
  };

  const handleReviewEdit = (id, index) => {
    const newReview = prompt("Edit your review:", reviews[index].review);
    if (newReview !== null) {
      fetch(`http://localhost:5000/reviews/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review: newReview }),
      })
        .then(() => {
          const updatedReview = { ...reviews[index], review: newReview };
          const newReviews = reviews.map((rev, i) =>
            i === index ? updatedReview : rev
          );
          setReviews(newReviews);
        })
        .catch((error) => {
          console.error("Error updating review:", error);
        });
    }
  };

  return (
    <div className="review-page">
      <div className="review-container">
        <div className="review-search">
          <h2>Section Review </h2>
          <form onSubmit={handleSubmit}>
            <FloatLabel>
              <InputText
                id="crn"
                value={crn}
                onChange={(event) => {
                  setCrn(event.target.value);
                }}
                aria-label="Section CRN"
              />
              <label htmlFor="crn">Section CRN</label>
            </FloatLabel>
            <Button label="Search" />
          </form>
        </div>
        {section && (
          <>
            <div className="section-details-wrapper">
              <div className="section-details">
                <h3>Section Details</h3>
                <p>Year: {section.year}</p>
                <p>Term: {section.term}</p>
                <p>CRN: {section.crn}</p>
                <p>
                  Course: {section.subject} {section.number}
                </p>
                <p>Title: {section.title}</p>
                <p>Instructor: {section.instructor}</p>
                <p>GPA: {section.gpa}</p>
                <p>Enrollments: {section.enrollments}</p>
                <p>Credits: {section.credits}</p>
              </div>
            </div>
            <div className="review-input">
              <form onSubmit={handleReviewSubmit}>
                <h3>Submit a Review</h3>
                <InputTextarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={5}
                  cols={30}
                  placeholder="Write your review here."
                  aria-label="Write your review here."
                  className="review-textarea"
                />
                <div className="review-submit-button">
                  <Button label="Submit" />
                </div>
              </form>
            </div>
            <div className="reviews-list">
              <h3>Reviews</h3>
              <table>
                <thead>
                  <tr>
                    <th className="review-column">Review</th>
                    <th className="edit-column">Edit</th>
                    <th className="delete-column">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((rev, index) => (
                    <tr key={rev.id}>
                      <td className="review-column">{rev.review}</td>
                      <td className="edit-column">
                        <Button
                          label="Edit"
                          onClick={() => handleReviewEdit(rev.id, index)}
                          className="p-button-secondary p-button-sm"
                        />
                      </td>
                      <td className="delete-column">
                        <Button
                          label="Delete"
                          onClick={() => handleReviewDelete(rev.id)}
                          className="p-button-danger p-button-sm"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Review;
