import React, {useState} from "react";
import SliderComponent from '../utils/SliderComponent';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

export default function AnnualIncrementor({onChecked, onValueChange}){

    let [increment, setIncrement] = useState(0);
    const [checked, setChecked] = useState(false);

    const handleChange = (element) =>{
        let newval=document.getElementById(element).value;
        setIncrement(newval);
        console.log(newval)
        onValueChange(newval)
    }

    const handleSliderChange = (newobj) =>{
        if(newobj.element==='monthlyIncrement'){
            console.log(newobj.newValue);
            setIncrement(parseInt(newobj.newValue));
            document.getElementById('monthlyIncrement').value=newobj.newValue;
            onValueChange(newobj.newValue)
        }
    }

    const handleSwitch = (event) =>{
        setChecked(event.target.checked);
        onChecked(!checked);
        console.log(!checked);
    }

    const label = { inputProps: { 'aria-label': 'yearlyIncr' } };


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));
  


    return(
  <Box  sx={{ width: '100%'}}> 
    <h6 style={{ margin:'0px', paddingLeft:'15px', paddingTop:'15px', color:'#9a6bcc' }}>{checked?'Disable':'Enable'} Step-up SIP?</h6>
    <Grid container  padding={0} rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
           <Grid size={12}>
           <Switch {...label} onChange={handleSwitch} color="secondary"/>
            </Grid>
    </Grid>
      
    <Grid container  padding={1} rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            
            <Grid size={6} item xs={12} sm={6} md={4}>
                    <Box sx={{ paddingLeft: 2}}>
                        <div className='tablediv'>Annual Step up</div>
                    </Box>
                </Grid>
               
            <Grid  size={6}  item xs={12} sm={6} md={4}>
                <Box sx={{ width: '100%', paddingLeft: 2 }}>
                        <div> 
                            <TextField disabled={!checked} label="Amount" id="monthlyIncrement" type="number" size="small" defaultValue={0}
                           
                            slotProps={{
                                input: {
                                startAdornment: <InputAdornment position="start">%</InputAdornment>,
                                },
                            }} onChange={()=>handleChange('monthlyIncrement')} >{increment}</TextField>
                        </div>
                    </Box>
            </Grid>
           
            <SliderComponent onValueChange={handleSliderChange} element='monthlyIncrement' max={100} defaultValue={0} step={1} disabled={!checked}/>
            
      </Grid>
    </Box> 
    )

}