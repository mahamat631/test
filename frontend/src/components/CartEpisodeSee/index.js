import React,{useState,useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from "../../axios/axios";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import List from '@material-ui/core/List';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 445,
        minWidth:445,
        minHeight:300,
        maxHeight:300,
        marginLeft:'14%',
        marginRight:'10%',
        marginTop:'17%',
        ['@media (max-width:1000px)']: { // eslint-disable-line no-useless-computed-key
          marginTop:'24%',
        },
    },
    appBar: {
        position: 'relative',
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
    submit:{
      paddingRight:'14%',
    },
    button:{
        textAlign:'right',
        marginLeft:236,
        '&:hover': {
          cursor:'pointer',
      },
    },
}));

const CartEpisodeSeen = (props) => {
  const data = props.article;
  const classes = useStyles();
  const theme = useTheme();
  const [episode,setEpisode] = useState('');
  const [open, setOpen] = React.useState(false);
  
  {/*Recuperer des episodes*/}
  const getEpisode = () => { 
    const header = {
        "Content-Type": "multipart/form-data"
    }
    axios.get(`/episodes/display?id=${data.id}`, header)
        .then(({data}) => {
            if(data !== undefined && data.errors.length === 0){
               setEpisode(data.episode);
            }
        })
        .catch(e => {
            console.log(e);
        })
    
  }

  {/*Marquer comme vu*/}
  const Seen = () => {
    const header = {
        "Content-Type": "multipart/form-data"
    }
    axios.post(`/episodes/watched?id=${data.id}`, header)
        .then(({data}) => {
            if(data !== undefined && data.errors.length === 0){
               console.log(data);
            }
        })
        .catch(e => {
            console.log(e);
        })
  }

  {/*Marquer comme non vus*/}
  const DeleteSeen = () => {
    const header = {
        "Content-Type": "multipart/form-data"
    }
    axios.delete(`/episodes/watched?id=${data.id}`, header)
        .then(({data}) => {
            if(data !== undefined && data.errors.length === 0){
               console.log(data);
            }
        })
        .catch(e => {
            console.log(e);
        })
  } 

  {/*Marquer tous les episodes comme vus*/}
    const ReadAll = () => {
        const header = {
            "Content-Type": "multipart/form-data"
        }
        axios.post(`/episodes/watched?id=${data.id}&bulk`, header)
            .then(({data}) => {
                if(data !== undefined && data.errors.length === 0){
                    window.location.reload();
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

   {/*Marquer tous les episodes comme vus*/}
 
    
  useEffect(() => {
    getEpisode();
  }, []);
  return (
        <>
        <List>
        <Card className={classes.root}>
          {data.code}
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                <p>{data.title.split('#').join('')}</p><br/>
                {data.description.split('#').join('')}...
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
        {data.user.seen===false?
              <>
                <VisibilityOffIcon className={classes.playIcon} color="primary" onClick={Seen}/>
                <Button type="submit" variant="contained" color="primary" textAlign="center" onClick={ReadAll}>READ THE PRECEDENT OF THIS EPISODE</Button>
              </> 
            :
              <>
                <VisibilityIcon className={classes.playIcon} color="secondary" onClick={DeleteSeen}/>
                <Button type="submit" variant="contained" color="secondary" className={classes.submit}> IS READ THIS EPISODE</Button>
              </> 
        }
        </CardActions>
        </Card>
        </List>
      </>
  );
}
export default CartEpisodeSeen;