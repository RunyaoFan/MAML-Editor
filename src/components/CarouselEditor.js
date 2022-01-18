import React from "react";
import "./CarouselEditor.css";
import UploadAndDisplayImage from "./UploadAndDisplayImage";

const CarouselEditor = (props) => {
  return (
    <div className="carousel-editor">
      <span className="close" onClick={props.toggle}>
        &times;{" "}
      </span>
      <UploadAndDisplayImage /> 
    </div>
  );
};

export default CarouselEditor;
