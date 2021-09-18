import React from 'react';
import {useAuth} from '../../context/auth';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import axios from "../../axios/axios";
import AppsIcon from '@material-ui/icons/Apps';
import {Link} from 'react-router-dom';
const SeriesCart = (props) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 345,
            minWidth:345,
            marginLeft:6,
            marginBottom:5,

          },
          description:{
            minHeight:100,
          },
          media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
          },
          expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
              duration: theme.transitions.duration.shortest,
            }),
          },
          expandOpen: {
            transform: 'rotate(180deg)',
          },
          avatar: {
            backgroundColor: red[500],
          },
          button:{
            textAlign:'right',
            marginLeft:236,
            '&:hover': {
              cursor:'pointer',
          },
        },
    }));
    const classes = useStyles();
    const AddSeries = (id) => {
        
        const header = {
            "Content-Type": "multipart/form-data"
        }
        axios.post(`https://api.betaseries.com/shows/show?id=${id}`, header)
            .then(({data}) => {
                if(data !== undefined && data.errors.length === 0){
                  console.log(data);
                  alert('une serie a été ajoutée');
                }
            })
            .catch(e => {
                if(e.response.data.errors !== undefined && e.response.data.errors.length > 0) {
                    console.log(e.response.data.errors[0].text);
                }
            })
    }

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={props.image}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                    <p>{props.title.split('#').join(' ')}</p><br/>
                    {props.description.split('#').join('')}...
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <Link to={'describe/'+props.id }>
                        <AppsIcon color='primary' fontSize="large" />
                    </Link>
                    </IconButton>
                    {props.button ?
                    <AddCircleOutlineIcon color='secondary' className={classes.button} fontSize="large"  onClick={() => {AddSeries(props.id)}}/>
                    :
                    null
                    }
            </CardActions>
        </Card>
    )
}

export default SeriesCart;