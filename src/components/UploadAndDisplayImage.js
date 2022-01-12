import React, { useState } from "react";

const UploadAndDisplayImage = () => {
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
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />}
    </div>
  );
};

export default UploadAndDisplayImage;