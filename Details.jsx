import React, {useEffect, useState} from 'react'
import {Card, CardActionArea, CardActions, CardContent, CardHeader} from "@mui/material";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

//TODO get date

async function gettablevals(query){
    const apiUrl=`https://api.polygon.io/v2/aggs/ticker/${query.query.toString()}/range/1/day/2021-07-21/2022-07-22?adjusted=true&sort=asc&limit=500&apiKey=QVcqDoOgvanAJx0Tjpj01BtguV0OLYoA`;
    const response=await fetch(apiUrl);
    return response.json()
}


const Details = (query) => {
    const [tablevals, settablevals] = useState([]);


    useEffect(() => {
        gettablevals(query)
            .then((data) => {
                const length = data.results.length;
                const dispprice = data.results[length - 1];
                settablevals(dispprice);
                console.log(dispprice)

            })

    }, [query])
    const tablearray=[tablevals];
    console.log(tablearray);


    return(
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table" style={{backgroundColor: "#222", color:"white"}}>
                <TableHead>
                    <TableRow>
                        <TableCell style={{color:"white"}}>Details:</TableCell>
                        <TableCell align="right" style={{color:"white"}}>High</TableCell>
                        <TableCell align="right" style={{color:"white"}}>Low</TableCell>
                        <TableCell align="right" style={{color:"white"}}>Open</TableCell>
                        <TableCell align="right" style={{color:"white"}}>Close</TableCell>
                        <TableCell align="right" style={{color:"white"}}>Volume</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tablearray.map((value) => (
                        <TableRow
                            key={value.t}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" style={{color:"white"}}>
                                {query.query.toString()}
                            </TableCell>
                            <TableCell align="right" style={{color:"white"}}>{value.h}</TableCell>
                            <TableCell align="right" style={{color:"white"}}>{value.l}</TableCell>
                            <TableCell align="right" style={{color:"white"}}>{value.o}</TableCell>
                            <TableCell align="right" style={{color:"white"}}>{value.c}</TableCell>
                            <TableCell align="right" style={{color:"white"}}>{value.v}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );


}

export default Details;