import React, {useEffect, useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

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
    //         <div className="container">
    //             <div className="row">{
    //                 newsdata.map((value)=>{
    //                 return(
    //                     <div className="col-3">
    //                         <div className="card" style={{width: "18rem"}}>
    //                             <img src={value.image_url} className="card-img-top" alt="..."/>
    //                             <div className="card-body">
    //                                 <h5 className="card-title">{value.title}</h5>
    //                                     <p className="card-text">{value.description}</p>
    //                                     <a href={value.article_url} className="btn btn-primary">Continue Reading</a>
    //                             </div>
    //                         </div>
    //
    //                     </div>
    //                 );
    //             })
    //
    //             }
    //             </div>
    //         </div>
    // );
        newsdata.map((value)=> {
            return (
                <Grid container spacing={3}>
                    <Grid xs>
                     <Card sx={{maxWidth: 345}}>
                         <CardActionArea>
                             <CardMedia
                                component="img"
                                height="140"
                                image={value.image_url}
                                alt="Stocks"
                            />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {value.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {value.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <a href={value.article_url} className="btn btn-primary">Continue Reading</a>
                            </CardActions>
                        </Card>
                            </Grid>
                        </Grid>
            );
        }))
}

export default News;