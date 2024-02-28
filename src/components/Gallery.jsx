import React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { baseURL } from '../services/baseURL';

function Gallery({ width, images,height }) {
  // console.log("im", images);

  return (
    <Box sx={{ width: 700, height: `${height}`, overflowY: 'scroll' }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {images?.length > 0 ? (
          images.map((image, index) => (
            <ImageListItem  key={index}>
               <img
                srcSet={`${baseURL}uploads/${image}`}
                src={`${baseURL}uploads/${image}?w=248&fit=crop&auto=format`}
                alt={`Image ${index + 1}`}
                loading="lazy"
              />
            </ImageListItem>
          ))
        ) : (
          <p>No images available</p>
        )}
      </ImageList>
    </Box>
  );
}

export default Gallery;
