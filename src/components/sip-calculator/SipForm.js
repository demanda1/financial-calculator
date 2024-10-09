import React, {useEffect, useState, useRef} from 'react';
import './SipForm.css';
import SliderComponent from '../utils/SliderComponent';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { PieChart } from '@mui/x-charts/PieChart';

export default function SipForm() {

    const [obj, setValue] = useState({
        monthlySip: 25000,
        rate: 12,
        year: 10,
        max: 1000000
    });

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
  });



  return (
    <div>
        <table>
            <thead>
            </thead>
            <tbody>
            <tr>
                <td ><div className='tablediv'>Monthly Investment</div> </td>
                <td><div> 
                   <TextField label="Amount" id="monthlySip" type="number" defaultValue={obj.monthlySip} size="small" sx={{ m: 1, width: '25ch' }}
                    slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                        },
                        }} onChange={()=>modifier('monthlySip')}>{obj.monthlySip}</TextField>
                </div></td>
                <td rowSpan={9}>
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
                </td>
            </tr>
            <tr>
               <td colSpan="2" >
                <SliderComponent onValueChange={handleSliderChange} element='monthlySip' max={obj.max} defaultValue={obj.monthlySip} step={1}/>
                </td> 
            </tr>
            <tr>
                <td><div className='tablediv'>Expected Return Rate</div> </td>
                <td colSpan="2"><div>
                <TextField  label="Return Rate" id="rate" type="number" defaultValue={obj.rate} size="small" sx={{ m: 1, width: '25ch' }}  slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                        },
                        }}>{obj.rate}</TextField>
                </div></td>
            </tr>
            <tr>
               <td colSpan="2">
               <SliderComponent onValueChange={handleSliderChange} element='rate' max='50' defaultValue={12} step={0.1}/>
                </td>
            </tr>
            <tr>
                <td><div className='tablediv'>Time Period</div> </td>
                <td colSpan="2"><div>
                <TextField  label="Years" id="year" type="number" defaultValue={obj.year} size="small" sx={{ m: 1, width: '25ch' }}  slotProps={{
                    input: {
                        startAdornment: <InputAdornment position="start">Yrs</InputAdornment>,
                        },
                        }}>{obj.year}</TextField>
                </div></td>
            </tr>
            <tr>
               <td colSpan="2">
               <SliderComponent onValueChange={handleSliderChange} element='year' max='50' defaultValue={10} step={1}/>
                </td>
            </tr>
            <tr>
               <td>
               <div className='tablediv'>Invested Amount</div>
                </td>
                <td><div id="invested-amount"></div>{inrFormatter.format(Math.round(obj.monthlySip * obj.year * 12 ))}</td>
            </tr>
            <tr>
               <td>
               <div className='tablediv'>Estimated Return</div>
                </td>
                <td><div id='estimated-return'></div>
                {inrFormatter.format(Math.round( obj.monthlySip * (((Math.pow(1+obj.rate/1200, obj.year*12) - 1) /(obj.rate/1200)).toFixed(4)) * (1 + (obj.rate/1200)))
                - Math.round(obj.monthlySip * obj.year * 12 ))}
                </td>
            </tr>
            <tr>
               <td>
               <div className='tablediv'>Total Value</div>
                </td>
                <td><div id='total-value'></div>{inrFormatter.format(Math.round( obj.monthlySip * (((Math.pow(1+obj.rate/1200, obj.year*12) - 1) /(obj.rate/1200)).toFixed(4)) * (1 + (obj.rate/1200))))}</td>
            </tr>
            </tbody>
        </table>
    </div>
  );
}