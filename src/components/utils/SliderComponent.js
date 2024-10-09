import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function SliderComponent({ onValueChange, max, defaultValue, element , step}) {

    const handleChange = (event) => {
        const newValue= event.target.value;
      onValueChange({newValue, element});

    };

  return (
    <Box sx={{ width: 600, paddingRight: '70px', textAlign: 'center' }}>
      <Slider
        onChange={handleChange}
        aria-labelledby="continuous-slider"
        color="secondary"
        defaultValue={defaultValue}
        min={0}
        max={Number(max)}
        step={step}
      />
    </Box>
  );
}

export default SliderComponent;