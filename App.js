import {useEffect, useState} from 'react';
import React from 'react'
import {CssBaseline} from "@mui/material";
import {Grid} from "@mui/material";
import Header from "./components/Aggregate/Header";
import Aggregate from "./components/Aggregate/Aggregate";
import Details from "./components/Details/Details";
import List from "./components/List/List";
import News from "./components/News/News";
import axios from 'axios';
import Chart from 'react-apexcharts';

// //TODO stock is the correct ticker
// const apiUrl='https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2021-07-21/2022-07-22?adjusted=true&sort=asc&limit=500&apiKey=QVcqDoOgvanAJx0Tjpj01BtguV0OLYoA';
// async function getStocks(){
//  const response=await fetch(apiUrl);
// return response.json()
// }
// const chart= {
//     options: {
//         chart: {
//             type: 'candlestick',
//             height: 500
//         },
//         title: {
//             text: 'APPL',
//             align: 'center'
//         },
//         xaxis: {
//             type: 'datetime'
//         },
//         yaxis: {
//             tooltip: {
//                 enabled: true
//             }
//         }
//     },
// };


function App() {
    const [query,setQuery]=useState("GOOG");
    return (
        <>
            <CssBaseline/>
            {/*  <Header/>*/}
            {/*  <Grid container spacing = {3} style = {{width:'100%'}}>*/}
            {/*    <Grid item xs = {12} md = {2} >*/}
            {/*      <List/>*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs = {12} md = {4} >*/}
            {/*      <Aggregate/>*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs = {12} md = {2} >*/}
            {/*      <Details/>*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs = {12} md = {4} >*/}
            {/*      <News/>*/}
            {/*    </Grid>*/}
            {/*  </Grid>*/}
            <Header onQuery={setQuery}/>
            <Details/>
            <Divider
                primaryColor="red"
                secondaryColor="grey"
                heightValue={2}
            ></Divider>
            <Aggregate query={query}/>
            <Divider
                primaryColor="red"
                secondaryColor="grey"
                heightValue={2}
            ></Divider>
            <News query={query}/>
        </>
    );
}

function Divider(props) {
    const { primaryColor, secondaryColor, heightValue } = props;
    console.log(heightValue);
    return (
        <hr
            style={{
                color: primaryColor,
                backgroundColor: secondaryColor,
                height: heightValue
            }}
        />
    );
}

export default App;
