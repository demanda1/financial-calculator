import React, {useEffect, useState, useRef} from 'react';
import './SipForm.css';
import SliderComponent from '../utils/SliderComponent';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { PieChart } from '@mui/x-charts/PieChart';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import AnnualIncrementor from './Annual-Incrementor';

export default function SipForm() {

    const [obj, setValue] = useState({
        monthlySip: 25000,
        rate: 12,
        year: 10,
        max: 100000
    });

    const [stepup, setStepup] = useState({
        invested: 25000,
        estimated: 52646,
        final: 77464
    });

    const [checked, setChecked] = useState(false);
    let [increment, setIncrement] = useState(0);

    const handleSliderChange = (newobj) => {
        
        if(newobj.element==='monthlySip'){
            console.log(newobj.newValue);
            document.getElementById('monthlySip').value=newobj.newValue;
            setValue({...obj, monthlySip: newobj.newValue});
        } else if(newobj.element==='rate'){
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
    if(changedObj==='monthlySip'){
        setValue({...obj, monthlySip: document.getElementById('monthlySip').value});
    } else if(changedObj==='rate'){
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

  const handleIncrementorChange = (isChecked) =>{
    setChecked(isChecked);
  }

  const handleValueChange = (obj) =>{
    setIncrement(obj)
  }

  function calculateStepUpSIPFutureValue(initialAmount, stepUpPercentage, annualRate, years) {
    let futureValue = 0;
    let monthlyRate = annualRate / 12;

    for (let k = 0; k < years; k++) {
        let yearlyInvestment = initialAmount * Math.pow(1 + stepUpPercentage, k);

        for (let m = 0; m < 12; m++) {
            futureValue += yearlyInvestment * Math.pow(1 + monthlyRate, 12 * (years - k) - m);
        }
    }

    return futureValue;
}

  const incVal=()=>{
    let totalInvestment = 0;
    let inc=0;
    for (let i = 0; i < obj.year; i++) {
       inc=inc+Math.pow(1+increment/100, i);
    }
    totalInvestment = obj.monthlySip*12*inc;

    // Example usage:
    let initialAmount = obj.monthlySip;  // Initial monthly SIP amount
    let stepUpPercentage = increment/100;  // Step-Up percentage (10%)
    let annualRate = obj.rate/100;  // Annual interest rate (8%)
    let years = obj.year;  // Number of years

    let futureValue = calculateStepUpSIPFutureValue(initialAmount, stepUpPercentage, annualRate, years);
    console.log(`Future Value: ₹${ Math.round(futureValue.toFixed(2))}`);
    
    setStepup(prevState => ({ estimated:Math.round(futureValue.toFixed(2)-totalInvestment), invested:totalInvestment, final:Math.round(futureValue.toFixed(2))}));
    console.log(`Estimated return: ₹${ Math.round(futureValue.toFixed(2)-totalInvestment)}`);
    //setStepup(prevState => ({ ...prevState, estimated:final-invested, final:Math.round(futureValue.toFixed(2))}))
    }

    useEffect(()=>{
        console.log("useeffect")
        incVal();
    },[obj, increment])


    const data = {
        datasets: [
          {
            data: [stepup.invested, stepup.estimated],
            label: ['Invested on Step up strategy', 'Estimated on Step up strategy'],
            color: checked? ['purple','plum']: ['gray','gray']
          },
        ],
      };
      const dataset = [
        {
            data: [stepup.invested, stepup.estimated],
            label: ['Invested on Step up strategy', 'Estimated on Step up strategy'],
            color: checked? ['purple','plum']: ['gray','gray']
          },
      ]

  return (
    <div>
<Box sx={{ width: '100%' }}>
      <Grid container  padding={1} rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={6} item xs={12} sm={6} md={4}>
        <AnnualIncrementor onChecked={handleIncrementorChange}  onValueChange={handleValueChange}/>
        {/* Inner sip form  open*/}
            <Grid container padding={1} rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid size={6} item xs={12} sm={6} md={4}>
                    <Box sx={{ paddingLeft: 2}}>
                        <div className='tablediv'>Monthly Investment</div>
                    </Box>
                </Grid>
                <Grid size={6} item xs={12} sm={6} md={4}>
                    <Box sx={{ width: '100%', paddingLeft: 2 }}>
                        <div> 
                            <TextField label="Amount" id="monthlySip" type="number" defaultValue={obj.monthlySip} size="small" 
                           
                            slotProps={{
                                input: { 
                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                },
                            }} onChange={()=>modifier('monthlySip')}>{obj.monthlySip}</TextField>
                        </div>
                    </Box>
                </Grid>
                    <SliderComponent onValueChange={handleSliderChange} element='monthlySip' max={obj.max} defaultValue={obj.monthlySip} step={1}/>
                
            </Grid>

            <Grid container padding={1} rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid size={6} item xs={12} sm={6} md={4}>
                    <Box sx={{ paddingLeft: 2}}>
                        <div className='tablediv'>Expected Return Rate</div>
                    </Box>
                </Grid>
                <Grid size={6} item xs={12} sm={6} md={4}> <Box sx={{ paddingLeft: 2}}>
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

            <Grid container padding={1} rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid size={6} item xs={12} sm={6} md={4}> <Box sx={{ paddingLeft: 2}}>
                    <div className='tablediv'>Time Period</div> 
                    </Box>
                </Grid>
                <Grid size={6} item xs={12} sm={6} md={4}> <Box sx={{ paddingLeft: 2 }}>
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
        <Grid size={6} item xs={12} sm={6} md={4}>
        
        <h3 style={{justifyContent:'center', color: 'purple'}}>With Normal SIP strategy:</h3>  
            <PieChart
                        series={[
                        {
                            data: [
                                { id: 0, value: Math.round(obj.monthlySip * obj.year * 12 ), label: 'Invested', color:'purple' },
                                { id: 1, value: Math.round( obj.monthlySip * (((Math.pow(1+obj.rate/1200, obj.year*12) - 1) /(obj.rate/1200)).toFixed(4)) * (1 + (obj.rate/1200)))- Math.round(obj.monthlySip * obj.year * 12 )
                                    , label: 'Estimated', color:'plum' }
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
                 <h3 style={{justifyContent:'center', color: checked?'purple':'gray'}}>With step up SIP strategy :</h3>
                 <PieChart 
                        series={[
                        {
                            data: [
                                { id: 0, value: stepup.invested, label: 'Invested', color: checked?'purple':'gray' },
                                { id: 1, value: stepup.estimated
                                    , label: 'Estimated' , color: checked?'plum':'gray' }
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
        <Grid size={6} item xs={12} sm={6} md={4} sx={{ backgroundColor: '#bf73db' , borderRadius: 2  }}>
            <Grid container  padding={1} rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid size={6} item xs={12} sm={6} md={4} paddingLeft={1}>
                <h4 style={{ margin:'0px', paddingLeft:'10px', color:'#ffffff'}} className='tablediv'>Invested Amount</h4>
                </Grid>
                <Grid size={6} item xs={12} sm={6} md={4} paddingLeft={1}>
                <h4 style={{ margin:'0px', paddingLeft:'10px', color:'#ffffff'}} className='tablediv'>{inrFormatter.format(Math.round(obj.monthlySip * obj.year * 12 ))}</h4>
                </Grid>
            </Grid>
            <Grid container  padding={1} rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid size={6} item xs={12} sm={6} md={4} paddingLeft={1}>
                <h4 style={{ margin:'0px', paddingLeft:'10px', color:'#ffffff'}} className='tablediv'>Estimated Return</h4>
                </Grid>
                <Grid size={6} item xs={12} sm={6} md={4} paddingLeft={1}>
                <h4 style={{ margin:'0px', paddingLeft:'10px', color:'#ffffff'}} className='tablediv'>
                {inrFormatter.format(Math.round( obj.monthlySip * (((Math.pow(1+obj.rate/1200, obj.year*12) - 1) /(obj.rate/1200)).toFixed(4)) * (1 + (obj.rate/1200)))
                - Math.round(obj.monthlySip * obj.year * 12 ))}</h4>
                </Grid>
            </Grid>
            <Grid container  padding={1} rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid size={6} item xs={12} sm={6} md={4} paddingLeft={1}>
                <h4 style={{ margin:'0px', paddingLeft:'10px', color:'#ffffff'}} className='tablediv'>Total Value</h4>
                </Grid>
                <Grid size={6} item xs={12} sm={6} md={4} paddingLeft={1}>
                <h4 style={{ margin:'0px', paddingLeft:'10px', color:'#ffffff'}} className='tablediv'>{inrFormatter.format(Math.round( obj.monthlySip * (((Math.pow(1+obj.rate/1200, obj.year*12) - 1) /(obj.rate/1200)).toFixed(4)) * (1 + (obj.rate/1200))))}</h4>
                </Grid>
            </Grid>
        </Grid>
         {/* Inner output form start */}
         
        <Grid size={6} item xs={12} sm={6} md={4} sx={{ backgroundColor: checked?'#943cb4':'gray', borderRadius: 2  }}>
          {/* Annual Increment */}
          <Grid container  padding={1} rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid size={6} item xs={12} sm={6} md={4} >
                <h4 style={{ margin:'0px', paddingLeft:'10px', color:'#ffffff'}} className='tablediv'> Invested Amount</h4>
                </Grid>
                <Grid size={6} item xs={12} sm={6} md={4}>
                <h4 style={{ margin:'0px', paddingLeft:'10px', color:'#ffffff'}} className='tablediv'>{checked?inrFormatter.format(stepup.invested):inrFormatter.format(0)}</h4>
                </Grid>
            </Grid>
            <Grid container  padding={1} rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid size={6} item xs={12} sm={6} md={4}>
                <h4 style={{ margin:'0px', paddingLeft:'10px', color:'#ffffff'}} className='tablediv'>Estimated Return</h4>
                </Grid>
                <Grid size={6} item xs={12} sm={6} md={4}>
                <h4 style={{ margin:'0px', paddingLeft:'10px', color:'#ffffff'}} className='tablediv'>
                {checked?inrFormatter.format(stepup.estimated):inrFormatter.format(0)}</h4>
                </Grid>
            </Grid>
            <Grid container  padding={1} rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid size={6} item xs={12} sm={6} md={4}>
                <h4 style={{ margin:'0px', paddingLeft:'10px', color:'#ffffff'}} className='tablediv'>Total Value</h4>
                </Grid>
                <Grid size={6} item xs={12} sm={6} md={4}>
                <h4 style={{ margin:'0px', paddingLeft:'10px', color:'#ffffff'}} className='tablediv'>{checked?inrFormatter.format(stepup.final):inrFormatter.format(0)}</h4>
                </Grid>
            </Grid>
        </Grid>
      </Grid>
    </Box>
    </div>
  );
}