import React, { useEffect, useState } from 'react';
import { baseURL } from '../services/baseURL';
import Carousel from 'react-bootstrap/Carousel';

function ProductImages({ imagesData }) {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            {imagesData?.length > 0 ? (
                imagesData.map((item, index) => (
                    <Carousel.Item key={index}>
                        <img src={`${baseURL}uploads/${item}`} alt="" width={"500px"} className='img-fluid' />
                    </Carousel.Item>
                ))
            ) : (
                <p>No images available</p>
            )}
        </Carousel>
    );
}

export default ProductImages;
