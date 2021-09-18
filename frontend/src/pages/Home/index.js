import React, { useState,useEffect } from "react";
import { useAuth } from "../../context/auth";
import { makeStyles } from '@material-ui/core/styles';
import SeriesCart from '../../components/SeriesCart';
import Grid from '@material-ui/core/Grid';
import axios from "../../axios/axios";
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import {Link} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root:{
      marginLeft:'14%',
      marginRight:'10%',
      marginTop:'7%',
      ['@media (max-width:1000px)']: { // eslint-disable-line no-useless-computed-key
        marginTop:'14%',
      },
  },
  first:{
      width:'80%',
  }
  }));

const Home = (props) => {
    const classes = useStyles();
    const[series,setSeries]=useState('');

    const getSeries = async()=>{
        const header = {
            "Content-Type": "multipart/form-data"
        }
        await axios.get("/shows/member?status=current", header)
            .then(({data}) => {
                if(data !== undefined && data.errors.length === 0){
                   setSeries(data.shows);
                }
            })
            .catch(e => {
               console.log(e); 
            })
    }
   
    useEffect(() => {
        getSeries();
    }, []);
    return(
        <Grid container className={classes.root}>
            <Link to={'list'}>
            < AddToQueueIcon color='primary' fontSize="large" />
            </Link>
            <Grid container className={classes.first}>
                {series ?
                    series.map(data => (
                        <SeriesCart 
                        image={data.images.show? data.images.show : data.images.box}
                        title={data.title}
                        description={data.description.substr(0, 120)}
                        id={data.id}
                        />
                        
                    ))
                :
                    <SeriesCart image='ddjk' title='dk' description='fgkoglm'/>
                }
            </Grid>
        </Grid>
    )
}
export default Home;