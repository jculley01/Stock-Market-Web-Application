import {useEffect, useState} from 'react';
import React from 'react'
import {CssBaseline} from "@mui/material";
import {Grid} from "@mui/material";
import axios from 'axios';
import Chart from 'react-apexcharts';

//TODO stock is the correct ticker
const apiUrl='https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2021-07-21/2022-07-22?adjusted=true&sort=asc&limit=500&apiKey=QVcqDoOgvanAJx0Tjpj01BtguV0OLYoA';
async function getStocks(){
    const response=await fetch(apiUrl);
    return response.json()
}
const chart= {
    options: {
        chart: {
            type: 'candlestick',
            height: 500
        },
        title: {
            text: 'APPL',
            align: 'center'
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        }
    },
};


function Aggregate (){
    const [series, setSeries]=useState( [{
        data: []
    }]);
    const [price, setPrice]=useState(-1);
    const [pastPrice, setPastPrice]=useState(-1);
    const [priceTime,setPriceTime]=useState(null);


    useEffect(()=>{
        getStocks()
            .then((data)=>{
                console.log(data);
                const length= data.results.length;
                console.log(length);
                const historical=[];
                for(let i=0; i<length; i++){
                    const tix=data.results[i];
                    historical[i]=[tix.t,tix.o,tix.h,tix.l,tix.c];
                }

                // const tix=data.results[0];
                // console.log(tix);
                // setPrice(tix.vw);
                // setPriceTime(new Date(tix.t*1000));
                // const plotprices=historical.map((t,index)=>({
                //     x: new Date(t*1000),
                //     y:[tix.o[index],tix.h[index],tix.l[index],tix.c[index]]
                // }));
                setSeries([{
                    data:historical
                }])
                // setVolume([{
                //     data:tixvol
                //     }])
            })
    },[])

    return (
        <h1>Aggregate
    <div className="price">
        {price}
        <br/>
        {priceTime && priceTime.toLocaleDateString()}
        <Chart options={chart.options} series={series} type="candlestick" width="100%" height={320} />
    </div>
            </h1>
    );
}

export default Aggregate;