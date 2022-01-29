import React, { useState } from "react";
import CarouselEditor from "./CarouselEditor";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./CarouselCard.css";

function CarouselCard() {
  return (
    <div>
      <Popup trigger={<button> Edit</button>} position="right center" modal>
        <CarouselEditor />
      </Popup>
    </div>
  );
}

export default CarouselCard;
