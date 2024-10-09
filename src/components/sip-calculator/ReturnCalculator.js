import React from "react";
import SipForm from "./SipForm";
import LumpsumForm from "./LumpsumForm";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ReturnCalculator() {
    const [alignment, setAlignment] = React.useState('sip');

    const handleChange = (event,newAlignment) => {
        if(newAlignment!=null){
            setAlignment(newAlignment);
        }
      };

    return(
        <div>
            <ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange} aria-label="Platform" >
                <ToggleButton color="secondary" value="sip">SIP</ToggleButton>
                <ToggleButton color="secondary" value="lumpsum">Lumpsum</ToggleButton>
            </ToggleButtonGroup>
            <div>
                {(alignment==='sip')? <SipForm/> : <LumpsumForm/>}
            </div>
        </div>
           
    )

}