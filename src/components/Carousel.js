import React from "react";
import ReactDOM from "react-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = (props) => {
    console.log(props.images);
    var settings = {
        dots: true
      };
      return (
        <div className="container">
          <Slider {...settings}>
          {props.images.map((image, index) => (
            <div key={index}>
              <img src={image['data_url']} width="100%"/>
            </div>
              
            ))}
          
          </Slider>
        </div>
      );
}


export default Carousel;