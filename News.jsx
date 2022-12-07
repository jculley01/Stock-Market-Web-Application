import React, {useEffect, useState} from 'react'

async function getNews(query){
    const apiUrl=`https://api.polygon.io/v2/reference/news?ticker=${query.query.toString()}&apiKey=g9_4ibOd58xVEQ8iGOrIIt_bxmFqVTW2`
    const response=await fetch(apiUrl);
    return response.json()
}
const News = (query) => {
const [newsdata, setnewsdata]=useState([])
    useEffect(()=>{
            getNews(query)
                .then((data) => {
                    console.log(data);
                    console.log(data.results);
                    setnewsdata(data.results);
                    const length = data.results.length;
                     const news = [];
                    for (let i = 0; i < length; i++) {
                      news[i] = data.results[i];
                    //     historical[i] = [tix.t, tix.o, tix.h, tix.l, tix.c];
                     }
                    //
                    // const dispprice = data.results[length - 1];
                    console.log(news[0].author);

                    //
                    // setnewsdata([{
                    //     news
                    //  }])

                })

    },[query])
    console.log(newsdata);
    return (
            <div className="container">
                <div className="row">{
                    newsdata.map((value)=>{
                    return(
                        <div className="col-3">
                            <div className="card" style={{width: "18rem"}}>
                                <img src={value.image_url} className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">{value.title}</h5>
                                        <p className="card-text">{value.description}</p>
                                        <a href={value.article_url} className="btn btn-primary">Continue Reading</a>
                                </div>
                            </div>

                        </div>
                    );
                })

                }
                </div>
            </div>
    );
}

export default News;