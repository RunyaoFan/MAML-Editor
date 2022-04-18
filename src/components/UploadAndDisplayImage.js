import React, { useState } from "react";

const UploadAndDisplayImage = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      {selectedImage && (
        <div>
        <img alt="not found" width={"100%"} src={URL.createObjectURL(selectedImage)} />
        <br />
        </div>
      )}

      {!selectedImage && <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log("from UploadAndDisplayImage.js:", event.target.files[0]);
          setSelectedImage(event.target.files[0]);
          props.setPic(event.target.files[0], props.picItemID)
        }}
      />}
    </div>
  );
};

export default UploadAndDisplayImage;