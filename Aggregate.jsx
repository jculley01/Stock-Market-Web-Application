import {useEffect, useMemo, useState} from 'react';
import React from 'react'
import Chart from 'react-apexcharts';



async function getStocks(query,current,day){
    const apiUrl=`https://api.polygon.io/v2/aggs/ticker/${query.query.toString()}/range/1/day/${current.getFullYear()-1}-${current.getMonth()+1}-${day}/${current.getFullYear()}-${current.getMonth()+1}-${day}?adjusted=true&sort=asc&limit=500&apiKey=QVcqDoOgvanAJx0Tjpj01BtguV0OLYoA`;
    const response=await fetch(apiUrl);
    return response.json()
}


async function getReal(query) {
    const finnhub=`https:finnhub.io/api/v1/quote?symbol=${query.query.toString()}&token=ce7ok3qad3i4pjr4oj10ce7ok3qad3i4pjr4oj1g`
    const response=await fetch(finnhub);
    return response.json()
}

async function getdetails(query){
    const apiUrl=`https://api.polygon.io/v3/reference/tickers/${query.query.toString()}?apiKey=quZjqwprpqMbql20ikgeHo7Sbfh_4v8H`
    const response=await fetch(apiUrl);
    return response.json()
}

function Aggregate (query){
    const current = new Date();
    let day;
    if(current.getDate()<=10){
        day=('0'+(current.getDate()-1))
    }
    else{
        day=current.getDate()-1;
    }
    console.log(query.query.toString());
    const [series, setSeries]=useState( [{
        data: []
    }]);
    const [tablevals, settablevals]=useState(-1);
    const [price, setPrice]=useState(-1);
    const [pastPrice, setPastPrice]=useState(-1);
    const [priceTime,setPriceTime]=useState(null);
    const [logourl, setlogo]=useState('')
    const [mainurl, setmainurl]=useState('')
    const [descript,setdescript]=useState('')



    useEffect(()=>{
            getStocks(query,current,day)
                .then((data) => {
                    console.log(data);
                    const length = data.results.length;
                    const historical = [];
                    for (let i = 0; i < length; i++) {
                        const tix = data.results[i];
                        historical[i] = [tix.t, tix.o, tix.h, tix.l, tix.c];
                    }

                    const dispprice = data.results[length - 1];
                    settablevals(dispprice);


                    setSeries([{
                        data: historical
                    }])

                })

    },[query])

    const chart= {
        options: {
            chart: {
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

    useEffect(()=>{
        getdetails(query)
            .then((detail) => {
                const deets = detail.results;
                console.log(deets)
                setlogo(deets.branding.logo_url + '?apiKey=quZjqwprpqMbql20ikgeHo7Sbfh_4v8H')
                setmainurl(deets.homepage_url)
                setdescript(deets.description)
                console.log(descript);

            })
    },[query])
    useEffect(()=>{
        let timeoutID;
        async function getlive() {
            const livetix=await getReal(query)
            const liveprice=livetix.c
            console.log(liveprice)
            setPastPrice(price);
             setPrice(liveprice);
           timeoutID=setTimeout(getlive,5000);
        }
        timeoutID=setTimeout(getlive,5000);
        return()=>{
            clearTimeout(timeoutID);
        }

    },[price,query])
    // console.log('Price'+price);
    // console.log('Past'+pastPrice);


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
                {/*    <img className="logo" src={logourl}/>*/}
                {/*    <button*/}
                {/*        className="my-custom-button"*/}
                {/*        onClick={() => window.open(mainurl, '_blank')}*/}
                {/*    >*/}
                {/*        Explore*/}
                {/*    </button>*/}
                {/*    <p className="tixdescription">*/}
                {/*        {descript}*/}
                {/*    </p>*/}
                {/*    <div className={['price',direction].join(' ')}>*/}
                {/*        Live Price:*/}
                {/*        <br/>*/}
                {/*    ${price}*/}
                {/*</div>*/}
                {priceTime && priceTime.toLocaleDateString()}
                <Chart options={chart.options} series={series} type="candlestick" width="100%" height={320} />
            </div>
        </div>
    );
 }

export default Aggregate;