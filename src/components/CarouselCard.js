import React, { useState } from "react";
import CarouselEditor from "./CarouselEditor";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function CarouselCard() {

    const [popupShowing, setPopupShowing] = useState(false);

    function togglePop() {
      setPopupShowing(!popupShowing);
    }
  
    return (
      <div>
        <button onClick={togglePop}>Edit</button>
        <Popup trigger={<button> Trigger</button>} position="right center" modal>
    <div>Popup content here !!</div>
  </Popup>
        
      </div>
    );
  };

export default CarouselCard;