import React,{useState} from 'react';
import {useAuth} from '../../context/auth'
import {makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {ImHome,ImTv } from "react-icons/im";
import {FaUserFriends} from "react-icons/fa";
import {Link} from 'react-router-dom';


const Header = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const { token ,logout} = useAuth();
    const[input,setInput]=useState(false);
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            width:'50%',
            color:'white',
            textDecoration:'none',
        },
        icon:{ 
            paddingLeft: '10%',
            "&:hover": {
                cursor:'pointer',
                }
            },
        profil:{
            paddingLeft: '30%',
        }
    }));
    const classes = useStyles();
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
  

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                <Typography className={classes.title}>
                    <Link to={'/'} className={classes.title}>
                    PREVIOUSLY ON
                    </Link>
                </Typography>
                {token ?
                <>
                <div className={classes.icon}>
                    <Link to='/'>
                    <ImHome fontSize="large" color="white"/>
                    </Link>
                </div>
                <div className={classes.icon}>
                    <Link to="/list" >
                        <ImTv  fontSize="large" color="white" />
                    </Link>
                </div>
                <div className={classes.icon}> 
                        <FaUserFriends fontSize="large" color="inherit"/>   
                </div>
                    <div className={classes.icon}>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem ><Link to="/" onClick={() => logout()}>Logout</Link></MenuItem>
                    </Menu>
                    </div>
                    </>
                :
                <div className={classes.icon}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem ><Link to="/login" >Login</Link></MenuItem>
                    <MenuItem ><Link to="/signup" >Register</Link></MenuItem>
                </Menu>
                </div>
                }
                </Toolbar>
            </AppBar>
        </div>
        
    )
}

export default Header;