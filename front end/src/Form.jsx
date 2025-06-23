import React, { useState } from "react";
import axios from "axios";
import ChartComponent from "./Diaplots";
import "./Form.css";
import Statistics from "./Statistics";

export default function Form() {
  const [fileName, setFileName] = useState("");
  const [res, setRes] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const file = form.elements.fileInput.files[0];
    console.log(file);

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/analyze_reviews/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );
      setRes(response);
      setFileName(response.data.message);
      setIsSubmitted(true); 
      console.log("Response from backend:", response);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); 
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="container ">
          <h1 className="heading text-center my-4">
            From <span>Review</span> to <span>Clue</span>, We{" "}
            <span>Decode</span> for You 🔍
          </h1>
          <div className="container-fluid w-50 p-0">
            <input
              type="file"
              className="py-4"
              name="fileInput"
            />
            <span className="d-flex flex-column align-items-end container-fluid p-0">
              <input type="submit" className="btn btn-custom w-25 m-0" />
            </span>
          </div>
        </div>
      </form>

      {fileName && (
        <div className="alert alert-success mt-4">
          File Uploaded: {fileName}
        </div>
      )}
      {loading && <div className="loader"></div>}
      {isSubmitted && (
        <>
          <Statistics res={res} />
          <ChartComponent res={res} isSubmitted={isSubmitted} />
        </>
      )}
    </div>
  );
}
