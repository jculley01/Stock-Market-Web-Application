import React, {useEffect, useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, CardActions, Link} from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2'



async function getNews(query){ //this is the news app fetching the the data from the Polygon API 
    const apiUrl=`https://api.polygon.io/v2/reference/news?ticker=${query.query.toString()}&apiKey=quZjqwprpqMbql20ikgeHo7Sbfh_4v8H`
    const response=await fetch(apiUrl);
    return response.json()
}

const News = (query) => { //based on the query we are passing we are putting the in constant variable and storing them in a array of data results
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
                }

            })

    },[query])

    const Item = styled(Paper)(({ theme }) => ({ //this is where we are setting up the card grid we are displaying the news data from and the feaures theyll hold
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    //this is where we are expecting an output of the data we fetched
    //then we are getting teh array of data and indexing 3 cards to go into a row and the size of each one
    // after that we are displaying the data of the card in the style we desire such as the title, image, and decription of the respective news source
    //at the end we are making the button on the card and doing the behavior of it
    return(
        <div className="darkmode">
            <div className="animate-charcter">
                Now Trending...
            </div>
            <Grid container spacing={3}>
                {newsdata.map((value) => (
                    <Grid item xs={4}> 
                        <Card sx={{maxWidth: 345}} style={{backgroundColor: "#3d3d3d", color:"white"}}>
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
                                <Typography variant="body2" color="white">
                                    {value.description}
                                </Typography>
                            </CardContent>

                            <CardActions> 

                                <button

                                    className="my-custom-button"
                                    onClick={() => window.open(value.article_url, '_blank')}
                                >
                                    <CardActionArea>
                                        Continue Reading
                                    </CardActionArea>
                                </button>

                            </CardActions>


                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );

}


export default News;
