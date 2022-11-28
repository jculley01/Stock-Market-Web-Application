import React from 'react'
import {CssBaseline} from "@mui/material";
import {Grid} from "@mui/material";
import Header from "./components/Header/Header";
import Aggregate from "./components/Aggregate/Aggregate";
import Details from "./components/Details/Details";
import List from "./components/List/List";
import News from "./components/News/News";

const App = () => {
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
  <Header/>
<Details/>
    <Divider
        primaryColor="red"
        secondaryColor="grey"
        heightValue={2}
    ></Divider>
    <Aggregate/>
    <Divider
        primaryColor="red"
        secondaryColor="grey"
        heightValue={2}
    ></Divider>
    <News/>
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