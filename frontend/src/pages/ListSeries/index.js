import React, { useState,useEffect } from "react";
import {alpha, makeStyles } from '@material-ui/core/styles';
import axios from "../../axios/axios";
import Grid from '@material-ui/core/Grid';
import SeriesCart from "../../components/SeriesCart";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
    root:{
        marginLeft:'14%',
        marginRight:'10%',
        marginTop:'5%',
    },
    first:{
        width:'80%',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '150%',
    },
  
  }));

const ListSeries = (props) => {
    const classes = useStyles();
    const[series,setSeries]=useState('');
    const[input,setInput]=useState('');

    const getSeries = async ()=>{
        const header = {
            "Content-Type": "multipart/form-data"
        }
        await axios.get("/shows/list?order=popularity", header)
        .then(({data}) => {
            if(data !== undefined && data.errors.length === 0){
                setSeries(data.shows);
            }
        })
        .catch(e => {
            console.log(e);
        })
    }
    const handleSubmit = (e) => { 
        e.preventDefault();
        const header = {
            "Content-Type": "multipart/form-data"
        }
        if(input.trim() !== ''){
            axios.get(`shows/search?title=${input}`, header)
            .then(({data}) => {
                if(data !== undefined && data.errors.length === 0){
                    setSeries(data.shows);
                }
            })
            .catch(e => {
                console.log(e);
            })
        }else{
            getSeries();
        }
       
    }
    useEffect(() => {
       getSeries();
    }, []);
    return(
        <Grid container className={classes.root}>
            <form onSubmit={handleSubmit} className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon/>
                </div>
                <InputBase placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                onChange={e => setInput(e.target.value)}
                inputProps={{ 'aria-label': 'search' }}/>
                <Button type="submit" variant="contained" color="secondary" className={classes.submit}>Search</Button>
            </form>
        <Grid container className={classes.first}>
            {series ?
                series.map(data => (
                    <SeriesCart 
                        image={data.images.show? data.images.show : data.images.box}
                        title={data.title}
                        description={data.description.substr(0, 120)}
                        id={data.id}
                        button={'button'}/>
                ))
            :
                <SeriesCart image='ddjk' title='dk' description='fgkoglm'/>
            }
        </Grid>
    </Grid>
    )
}
export default ListSeries;