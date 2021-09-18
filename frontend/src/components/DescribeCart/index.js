import React, { useState,useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from "../../axios/axios";
import { useParams } from "react-router";
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import ArchiveIcon from '@material-ui/icons/Archive';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import EpisodeCart from '../EpisodeCart';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import CartEpisodeSee from '../CartEpisodeSee';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root:{
      marginLeft:'14%',
      marginRight:'14%',
      marginTop:'5%',
    
  }, 
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root2: {
  },
  media: {
    height: 500,
    width:1050,
  },
  header:{
    height: 500,
    width:600,
  },
  title:{
    width:'100%',
    textAlign:'center',
    color:'blue',
    fontSize:'200%',
    marginTop:'5%',
  },
  description:{
    marginTop:'7%',
    width:'100%',
    fontSize:'120%',
    textAlign:'center',
    fontFamily: 'cursive',
  },
  season:{
    marginTop:'7%',
    paddingBottom:'5%',
  },
  genre:{
    marginTop:'7%',
    color:'blue',
  },
  season1:{
    marginTop:'7%',
    textAlign:'center',
    width:'100%',
    color:'blue',
  },
  descrip:{
    minHeight: '88%',
  },
  button:{
      textAlign:'right',
      marginLeft:'3%',
  },
  button1:{
    textAlign:'left',
  },
  icon:{
    "&:hover": {
        cursor:'pointer',
        }
  },
  notes:{
    fontSize:'130%',
    marginLeft:'1%',
    marginTop:'6px'
  },
  root1: {
    '& > *': {
      margin: theme.spacing(1),
      width: '28ch',
    },
  },
  CartEpisodeSee:{
    display:'flex',
  }
  }));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const DescribeCart = (props) => {
    const series =props.articles;
    const [seasons, setSeasons]=useState('');
    const [episodes, setEpisodes]=useState('');
    const [idSeasons, setidSeasons]=useState(1);
    const classes = useStyles();
    const { id } = useParams();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
 
    {/* archiver la series */}

    const Archive = () => {
        const header = {
            "Content-Type": "multipart/form-data"
        }
        axios.post(`/shows/archive?id=${id}`, header)
            .then(({data}) => {
                if(data !== undefined && data.errors.length === 0){
                  console.log(data);
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    {/* listing des saisons */}
    const getSeasons = () => {
      const header = {
        "Content-Type": "multipart/form-data"
    }
    axios.get(`/shows/seasons?id=${series.id}`, header)
        .then(({data}) => {
            if(data !== undefined && data.errors.length === 0){
              setSeasons(data.seasons);
            }
        })
        .catch(e => {
            console.log(e);
        })
    }
    {/* listing des episodes */}

    const getEpisode = () => {
      const header = {
        "Content-Type": "multipart/form-data"
      }
        axios.get(`/shows/episodes?id=${series.id}&season=${idSeasons}`, header)
        .then(({data}) => {
          setEpisodes(data.episodes);
        })
        .catch(e => {
            console.log(e);
        })
    }
    
    useEffect(() => {
      getSeasons();
      getEpisode();
    }, []);

    useEffect(() => {
      getEpisode();
    }, [idSeasons]);

    let button;
    for (const [key, value] of Object.entries(series.genres)) {
        button= value;
    }
    const [value, setValue] = useState(-1);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
 
    return(
        <Card className={classes.root}>
            <CardActionArea  className={classes.header}>
                <CardMedia 
                  className={classes.media}
                  component="img"
                  alt="Contemplative Reptile"
                  image={series.images.show?series.images.show:'/téléchargement (1).jpeg'}
                  title="Contemplative Reptile"
                />
              
            </CardActionArea>
            <Grid item xs={12} >
              <Grid className={classes.descrip}>
                <Grid className={classes.title}>{series.title.split('#').join('')}</Grid>
                <Grid className={classes.description}>{series.description}</Grid>
                <Grid className={classes.genre} >
                    Genres: 
                   { button}
                </Grid>
                <Grid container className={classes.season}>
                    <Grid container className={classes.season2}> 
                        <Grid item xs={6}>Nombre de saisons: {series.seasons}</Grid>
                        <Grid item xs={6}>Nombre d'épisodes: {series.episodes}</Grid>
                    </Grid>   
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={11} container className={classes.button1}>
                  <StarOutlineIcon className={classes.icon} color='secondary' fontSize="large"/>
                  <StarOutlineIcon className={classes.icon} color='secondary' fontSize="large"/>
                  <StarOutlineIcon className={classes.icon} color='secondary' fontSize="large"/>
                  <p className={classes.notes}>{series.notes.total}</p>
                </Grid>
                <Grid className={classes.button}>
                  <ArchiveIcon className={classes.icon} color='secondary' fontSize="large" onClick={Archive}/>
                </Grid>
              </Grid> 
            </Grid>
            <Grid>
              <FormControl variant="outlined" className={classes.root1}>
                    <InputLabel id="demo-controlled-open-select-label">Saisons</InputLabel>
                        <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" label="Saisons">
                          {seasons?
                            seasons.map(data => (
                              <MenuItem onClick={() => {setidSeasons(data.number)}} value={data.number}><em>Saison {data.number}</em></MenuItem>
                            ))
                            :
                              <MenuItem value=""><em>None</em></MenuItem>
                            }    
                        </Select>
                </FormControl>
                <div className={classes.root2}>
                  <Grid>
                  <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Open the list Series not see 
                  </Button>
                  <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                      <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                          <CloseIcon />
                        </IconButton>
                      </Toolbar>
                    </AppBar>
                    <Grid container>
                        {episodes?
                          episodes.map( data => {
                            if(data.user.seen===false)
                              return <CartEpisodeSee  article={data}/>
                          })
                          : null}
                      </Grid>
                  </Dialog>
                  </Grid>
                    <AppBar position="static" color="default">
                      <Tabs value = {value} onChange = {handleChange} variant = "scrollable" scrollButtons = "on" indicatorColor = "primary" textColor = "primary" aria-label = "scrollable force tabs example"> 
                        {episodes?
                          episodes.map( data => (
                            <Tab label = {data.episode} icon="episode " {...a11yProps(data.episodes)} />
                          ))
                            :null
                          }
                      </Tabs>
                    </AppBar>
                      {episodes?
                        episodes.map( data => (
                          <TabPanel value = {value} index = {data.episode-1}>
                            <EpisodeCart article={data}/>
                          </TabPanel>
                          ))
                        : null
                      }
                </div>
          </Grid>
      </Card>
    )
}
export default DescribeCart;