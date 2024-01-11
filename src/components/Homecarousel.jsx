import React from 'react'
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Homeimg1 from '../assets/home1-image-1.jpg'
import Homeimg2 from "../assets/home1-image-5.jpg"
import Homeimg3 from "../assets/home1-image-3.jpg"
import '../style/Home.css'
function Homecarousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img src={Homeimg1} alt="" className='img-fluid' style={{height:'90vh',width:'100%'}}/>
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img src={Homeimg2} alt="" className='img-fluid'  style={{height:'90vh',width:'100%'}}/>
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <img src={Homeimg3} alt="" className='img-fluid'  style={{height:'90vh',width:'100%'}}/>
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
}

export default Homecarousel
