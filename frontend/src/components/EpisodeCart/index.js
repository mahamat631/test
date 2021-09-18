import React,{useState,useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import axios from "../../axios/axios";
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}
  
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    maxHeight:500,
    minHeight:300,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    minWidth:'40%',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
  },
  descrip:{
    maxHeight:'70%',
    minHeight:'70%',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const EpisodeCart = (props) => {
  const data = props.article;
  const classes = useStyles();
  const theme = useTheme();
  const [episode,setEpisode] = useState('');
  const [text,setText] = useState('');
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
   const Commenter =(e)=>{
    e.preventDefault();
    const header = {
        "Content-Type": "multipart/form-data"
    }
    let formData = new FormData();
    formData.append("text", text);
    axios.post(`/comments/comment?id=${data.id}&type=episode`,formData, header)
        .then(({data}) => {
            if(data !== undefined && data.errors.length === 0){
                console.log(data);
                alert('commentaire ajoutée');
            }
        })
        .catch(e => {
            console.log(e);
        })
  }
    
  useEffect(() => {
    getEpisode();
  }, []);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">COMMENTAIRES</h2>
      <p id="simple-modal-description">Commenter cette épisode</p>
      <form onSubmit={Commenter}>
            <TextField variant="outlined" margin="normal" required fullWidth id="text" label="text" name="text" autoComplete="text" autoFocus onChange={e => setText(e.target.value)} />
             <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Commenter</Button>
        </form>
    </div>
  );
  return (
    <Card className={classes.root}>
        <div className={classes.details}>
            <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">{data.title.split('#').join('')}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {episode?
                        episode.code
                        :  null
                    }
                </Typography>
            </CardContent>
            <div className={classes.controls}>
                <IconButton aria-label="previous"> {data.number} </IconButton>
                {data.user.seen===false?
                <IconButton aria-label="next">
                        <VisibilityOffIcon className={classes.playIcon} color="primary" onClick={Seen}/>
                </IconButton>
                : 
                <IconButton aria-label="next">
                        <VisibilityIcon className={classes.playIcon} color="secondary" onClick={DeleteSeen}/>
                </IconButton>  
                }
            </div>
        </div>
        <div className={classes.cover}>
            <p className={classes.descrip}>{data.description}</p>     
        <Grid item xs={3}>{episode.date}</Grid>
            <Grid container>
                {data.user.seen===false?
                <Grid item xs={6} className={classes.submit}>
                    <Button type="submit" variant="contained" color="primary" textAlign="center" onClick={ReadAll}>READ THE PRECEDENT OF THIS EPISODE</Button>
                </Grid>
                :
                <Grid item xs={6} className={classes.submit}>
                <Button type="submit" variant="contained" color="secondary" className={classes.submit}> IS READ THIS EPISODE</Button>
                </Grid>
                }
                 <Grid item xs={4}>
                    <Button type="submit" variant="contained" color="secondary" className={classes.submit1} onClick={handleOpen}>COMMENTAIRES</Button>
                    <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">{body}</Modal>
                </Grid>
            </Grid>
        </div> 
    </Card>
  );
}
export default EpisodeCart;