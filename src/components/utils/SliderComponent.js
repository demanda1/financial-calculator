import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

function SliderComponent({ onValueChange, max, defaultValue, element , step, disabled}) {

    const handleChange = (event) => {
        const newValue= event.target.value;
      onValueChange({newValue, element});

    };

  return (
    
        <Grid  size={12} item xs={12} sm={6} md={4}> 
          <Box sx={{
            padding: 2,
            width: '88%', // Ensure it takes full width of the Grid item
            boxSizing: 'border-box',
          }}>
          <Slider
          onChange={handleChange}
          aria-labelledby="continuous-slider"
          color="secondary"
          defaultValue={defaultValue}
          min={0}
          max={Number(max)}
          step={step}
          disabled={disabled}
        />
        </Box>
        </Grid>
      
  );
}

export default SliderComponent;