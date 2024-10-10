import React, {useEffect, useState} from 'react';
import './SipForm.css';
import SliderComponent from '../utils/SliderComponent';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { PieChart } from '@mui/x-charts/PieChart';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';

export default function SwpForm() {

    const [obj, setValue] = useState({
        investment: 500000,
        withdrawal: 10000,
        rate: 8,
        year: 5,
        max: 5000000
    });

    const handleSliderChange = (newobj) => {
        
        if(newobj.element==='investment'){
            console.log(newobj.newValue);
            document.getElementById('investment').value=newobj.newValue;
            setValue({...obj, investment: newobj.newValue});
        } else if(newobj.element==='withdrawal'){
            console.log(newobj.newValue);
            document.getElementById('withdrawal').value=newobj.newValue;
            setValue({...obj, withdrawal: newobj.newValue});
        }else if(newobj.element==='rate'){
            console.log(newobj.newValue);
            document.getElementById('rate').value=newobj.newValue;
            setValue({...obj, rate: newobj.newValue});
        } else if(newobj.element==='year'){
            console.log(newobj.newValue);
            document.getElementById('year').value=newobj.newValue;
            setValue({...obj, year: newobj.newValue});
        }
    };

  function modifier(changedObj){
    if(changedObj==='investment'){
        setValue({...obj, investment: document.getElementById('investment').value});
    } else if(changedObj==='withdrawal'){
        setValue({...obj, withdrawal: document.getElementById('withdrawal').value});
    }else if(changedObj==='rate'){
        setValue({...obj, rate: document.getElementById('rate').value});
    } else if(changedObj==='year'){
        setValue({...obj, year: document.getElementById('year').value});
    }
  }

  const inrFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  });


  return (
    <Box sx={{ width: '100%' }}>
      <Grid container paddingTop={5} rowSpacing={1} >
        <Grid size={6}>
        {/* Inner sip form  open*/}
            <Grid container padding={1} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid size={6}>
                    <Box sx={{ padding: 2}}>
                        <div className='tablediv'>Total Investment</div>
                    </Box>
                </Grid>
                <Grid size={6} item xs={12} sm={6} md={4}>
                    <Box sx={{ width: '100%', padding: 2 }}>
                        <div> 
                            <TextField label="Amount" id="investment" type="number" defaultValue={obj.investment} size="small" 
                           
                            slotProps={{
                                input: {
                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                },
                            }} onChange={()=>modifier('investment')}>{obj.investment}</TextField>
                        </div>
                    </Box>
                </Grid>
                    <SliderComponent onValueChange={handleSliderChange} element='investment' max={obj.max} defaultValue={obj.investment} step={1}/>
                
            </Grid>

            <Grid container padding={1} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid size={6}>
                    <Box sx={{ padding: 2}}>
                        <div className='tablediv'>Withdrawal per month</div>
                    </Box>
                </Grid>
                <Grid size={6} item xs={12} sm={6} md={4}>
                    <Box sx={{ width: '100%', padding: 2 }}>
                        <div> 
                            <TextField label="WithdrawalAmount" id="withdrawal" type="number" defaultValue={obj.withdrawal} size="small" 
                           
                            slotProps={{
                                input: {
                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                },
                            }} onChange={()=>modifier('withdrawal')}>{obj.withdrawal}</TextField>
                        </div>
                    </Box>
                </Grid>
                    <SliderComponent onValueChange={handleSliderChange} element='withdrawal' max={50000} defaultValue={obj.withdrawal} step={1}/>
                
            </Grid>

            <Grid container padding={1} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid size={6}>
                    <Box sx={{ padding: 2}}>
                        <div className='tablediv'>Expected Return Rate</div>
                    </Box>
                </Grid>
                <Grid size={6}> <Box sx={{ padding: 2}}>
                    <div> 
                        <TextField  label="Return Rate" id="rate" type="number" defaultValue={obj.rate} size="small"   
                        slotProps={{
                            input: {
                            startAdornment: <InputAdornment position="start">%</InputAdornment>,
                            },
                            }} onChange={()=>modifier('rate')}>{obj.rate}</TextField>
                    </div>
                    </Box>
                </Grid>
                        <SliderComponent onValueChange={handleSliderChange} element='rate' max='50' defaultValue={12} step={0.1}/>
            </Grid>

            <Grid container padding={1} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid size={6}> <Box sx={{ padding: 2}}>
                    <div className='tablediv'>Time Period</div> 
                    </Box>
                </Grid>
                <Grid size={6}> <Box sx={{ padding: 2 }}>
                    <div> 
                        <TextField  label="Years" id="year" type="number" defaultValue={obj.year} size="small" 
                        slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">Yrs</InputAdornment>,
                            },
                            }} onChange={()=>modifier('year')}>{obj.year}</TextField>
                    </div>
                    </Box>
                </Grid>
               
                    <SliderComponent onValueChange={handleSliderChange} element='year' max='50' defaultValue={10} step={1}/> 
            </Grid>

        {/* Inner sip form closed */} 
        </Grid>
        <Grid paddingTop={10} size={6}>
        <PieChart
                        series={[
                        {
                            data: [
                                { id: 0, value: obj.investment, label: 'Invested', color:'purple' },
                                { id: 1, value: Math.round((obj.investment*Math.pow(1+obj.rate/1200,12*obj.year))-
                                    (obj.withdrawal * ((Math.pow((1+obj.rate/1200), 12*obj.year)-1)/(obj.rate/1200)))), 
                                    label: 'Remaining', color:'plum' }
                                ],
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 0,
                            cornerRadius: 2,
                            startAngle: 0,
                            endAngle: 360
                        },
                    ]}
                     width={400}
                    height={200}
                />
        </Grid>
       {/* Inner output form start */}
        <Grid size={6}>
            <Grid container padding={1} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid size={6}>
                    <div className='tablediv'>Invested Amount</div>
                </Grid>
                <Grid size={6}>
                    <div id="invested-amount"></div>{inrFormatter.format(obj.investment)}
                </Grid>
            </Grid>
            <Grid container padding={1} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid size={6}>
                    <div className='tablediv'>Total withdrawal</div>
                </Grid>
                <Grid size={6}>
                <div id='total-withdrawal'></div>
                {inrFormatter.format(Math.round( obj.withdrawal * 12 * obj.year))}
                </Grid>
            </Grid>
            <Grid container padding={1} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid size={6}>
                    <div className='tablediv'>Final Value</div>
                </Grid>
                <Grid size={6}>
                    <div id='final-value'></div>{inrFormatter.format(Math.round((obj.investment*Math.pow(1+obj.rate/1200,12*obj.year))-
                     (obj.withdrawal * ((Math.pow((1+obj.rate/1200), 12*obj.year)-1)/(obj.rate/1200)))))}
                </Grid>
            </Grid>
        </Grid>
         {/* Inner output form start */}
        <Grid size={6}>
          {/* Empty for adding new feature */}
        </Grid>
      </Grid>
    </Box>
  );
}