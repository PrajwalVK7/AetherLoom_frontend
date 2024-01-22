import React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function Gallery({ width, images }) {
  console.log("im", images);

  return (
    <Box sx={{ width: `${width}px`, height: 450, overflowY: 'scroll' }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {images?.length > 0 ? (
          images.map((image, index) => (
            <ImageListItem key={index}>
              <img
                srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                src={`${image}?w=248&fit=crop&auto=format`}
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
