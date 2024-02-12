import { Box, Button, Hidden, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HomeIcon from '../assets/home-icon.svg';
import ChatIcon from '../assets/chat-icon.svg';
import AboutIcon from '../assets/about-icon.svg';

const navLinks = [
    {
        title: 'Home',
        icon: HomeIcon,
        path: '/'
    },
    {
        title: 'Chat',
        icon: ChatIcon,
        path: '/'
    },
    {
        title: 'About',
        icon: AboutIcon,
        path: '/'
    }
]

function ChatSideBar(){
    const {pathname} = useLocation(); 
    
    return(
        <div>
            <Box sx={{
                backgroundColor: "#000000",
                padding: 2,
                boarderRadius: 3,
                display: 'flex',
                flexDirection: {xs: "row", lg: "column"},
                alignItems: 'center',
                justifyContent: 'space-between',
                width: {sm: '100%', lg:200},
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: {xs: "row", lg: "column"},
                    gap: 5,
                    alignItems: {xs:'center', lg: 'start'},
                    width: '90%',
                }}>
                    <Hidden smDown>
                        <Typography variant="h6" component="h1" my={2} fontWeight={400} fontSize={18}>ChatLLM</Typography>
                    </Hidden>
                    <Box sx={{
                        py:{
                            xs:"0px",
                            ls: "10px"
                        },
                        display: 'flex',
                        flexDirection: {xs: "row", lg: "column"},
                        gap:4
                    }}>
                        {navLinks.map((item) => (
                            <Link key={item.title} to={item.path} style={{textDecoration: 'none'}}>
                                <Box sx={{
                                    display:'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    color:'white',
                                    textDecoration: 'none',
                                }}>
                                    <img src={item.icon} 
                                    alt={item.title} 
                                    style={{width: '17px',
                                            filter: `${pathname=== item.path ? "invert(58%) sepia(14%) staurate(3166%)" : "invert(84%)"}`,
                                            }}/>
                                    <Hidden mdDown>
                                        <Typography>{item.title}</Typography>
                                    </Hidden>
                                </Box>
                            </Link>
                        ))}
                        <Button variant="contained" style={{backgroundColor: '#242424', color:'white'}} onClick={()=> { window.location.reload()}}>Clear Conversation</Button>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default ChatSideBar;