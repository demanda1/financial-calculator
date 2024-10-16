import React from "react";
import SipForm from "./SipForm";
import LumpsumForm from "./LumpsumForm";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import SwpForm from "./SwpForm";

export default function ReturnCalculator() {
    const [alignment, setAlignment] = React.useState('sip');

    const handleChange = (event,newAlignment) => {
        if(newAlignment!=null){
            setAlignment(newAlignment);
        }
      };


        const pickCalculator=()=>{
            if(alignment==='sip'){
                return <SipForm />
            } else if(alignment==='lumpsum'){
                return <LumpsumForm />
            } else if(alignment==='swp'){
                return <SwpForm />
            }
          }
      

    return(
        <div>
            <Box sx={{ width: '100%' }}>
                <Grid container paddingTop={5} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid size={12}>
                        <div style={{paddingLeft:"20px"}}>
                        <ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange} aria-label="Platform" >
                        <ToggleButton color="secondary" value="sip">SIP</ToggleButton>
                        <ToggleButton color="secondary" value="lumpsum">Lumpsum</ToggleButton>
                        <ToggleButton color="secondary" value="swp">SWP</ToggleButton>
                        </ToggleButtonGroup>
                        </div>
                    <div>
                        {pickCalculator()}
                    </div>
                    </Grid>
                </Grid>
            </Box>
        </div>
           
    )

}