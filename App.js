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


function App() {
const [query,setQuery]=useState("GOOG");
  return (
<>
  <CssBaseline/>
  <Header onQuery={setQuery}/>
    <Aggregate query={query}/>
    <Details query={query}/>
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