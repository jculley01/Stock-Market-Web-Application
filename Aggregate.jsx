import {useEffect, useMemo, useState} from 'react';
import React from 'react'
import Chart from 'react-apexcharts';



async function getStocks(query,current,day){
    //call the polygon.io aggregate section, passing the date parameters and query input.
    const apiUrl=`https://api.polygon.io/v2/aggs/ticker/${query.query.toString()}/range/1/day/${current.getFullYear()-1}-${current.getMonth()+1}-${day}/${current.getFullYear()}-${current.getMonth()+1}-${day}?adjusted=true&sort=asc&limit=500&apiKey=QVcqDoOgvanAJx0Tjpj01BtguV0OLYoA`;
    const response=await fetch(apiUrl);
    //return object
    return response.json()
}


async function getReal(query) {
    //call the finnhub API quote section with inputted query
    const finnhub=`https:finnhub.io/api/v1/quote?symbol=${query.query.toString()}&token=ce7ok3qad3i4pjr4oj10ce7ok3qad3i4pjr4oj1g` 
    const response=await fetch(finnhub);
    //return object
    return response.json()
}

async function getdetails(query){
    //call the polygon.io details section with query input
    const apiUrl=`https://api.polygon.io/v3/reference/tickers/${query.query.toString()}?apiKey=quZjqwprpqMbql20ikgeHo7Sbfh_4v8H`
    const response=await fetch(apiUrl);
    //return object
    return response.json()
}

function Aggregate (query){
    const current = new Date();//store the current system date withing current.
    let day;
    if(current.getDate()<=10){//convert day to be correct format needed in API call 9->09
        day=('0'+(current.getDate()-1))
    }
    else{
        day=current.getDate()-1;
    }
    
    const [series, setSeries]=useState( [{
        data: []
    }]);
   //initialize needed variables as useStates
    const [price, setPrice]=useState(0);
    const [pastPrice, setPastPrice]=useState(0);
    const [priceTime,setPriceTime]=useState(null);
    const [logourl, setlogo]=useState('')
    const [mainurl, setmainurl]=useState('')
    const [descript,setdescript]=useState('')


//getStocks useEffect calls the function and returns object in promise variable data, with dependency on query
    useEffect(()=>{
            getStocks(query,current,day)
                .then((data) => {
                    const length = data.results.length;
                    const historical = [];
                    for (let i = 0; i < length; i++) {//manipulate the data into array to accomidated apexcharts documentation
                        const tix = data.results[i];
                        historical[i] = [tix.t, tix.o, tix.h, tix.l, tix.c];
                    }
                    
                    setSeries([{
                        data: historical
                    }])

                })

    },[query])
//create chart according to apexchart documentation
    const chart= {
        options: {
            chart: {//style chart
                foreColor: '#ffffff',
                type: 'candlestick',
                height: 500
            },
            title: {
                text: query.query.toString(),
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
//getdetails useEffect calls the function and returns object in promise variable detail, with dependency on query. The data is then indexed to store company logo url, main url, and description
    useEffect(()=>{
        getdetails(query)
            .then((detail) => {
                const deets = detail.results;
                setlogo(deets.branding.logo_url + '?apiKey=quZjqwprpqMbql20ikgeHo7Sbfh_4v8H')
                setmainurl(deets.homepage_url)
                setdescript(deets.description)

            })
    },[query])
    //The useEffect has an imbedded async function getlive in order to handle the refresh of the live ticker, dependency on query and price
    useEffect(()=>{
        let timeoutID;
        async function getlive() {
            const livetix=await getReal(query)//call the function and store the obkect in livetix
            const liveprice=livetix.c
            setPastPrice(price);
             setPrice(liveprice);
           timeoutID=setTimeout(getlive,5000);
        }
        timeoutID=setTimeout(getlive,5000);//refresh the call every 5 seconds
        return()=>{
            clearTimeout(timeoutID);//clear refresh
        }

    },[price,query])

//assign correct css tag to the liveticker display depending on whether the price went up, down, or stayed the same
const direction= useMemo(()=>pastPrice<price?'up':pastPrice>price?'down':'',[pastPrice,price]);


    return (
        <div className="darkmode">
            <div className="price">
                <div className="container">
                    <div className="card">
                        <div className="imgbox">
                            <i className="fab logo">
                                <img className="logo" src={logourl}/>
                            </i>
                        </div>
                        <div className="content">
                            <h3 id="tix">{query.query.toString()}</h3>
                            <p> {descript}</p>
                            <a href={mainurl}>Explore</a>
                            <div className={['price',direction].join(' ')}>
                                Live Price:
                                ${price}
                            </div>
                        </div>
                    </div>
                </div>
                {priceTime && priceTime.toLocaleDateString()}
                <Chart options={chart.options} series={series} type="candlestick" width="100%" height={320} />
            </div>
        </div>
    );
 }

export default Aggregate;
