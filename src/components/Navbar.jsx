import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';


const Navbar = () => {
  const handleLogout = async ()=>{
    try {
        await signOut(auth)

    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div>
     <Box sx={{ flexGrow: 1, borderBottom: 2 }}>
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h4"
            component="div"
            sx={{ fontFamily: "cursive", color: "black" }}
          >
            Memory_Saver<span>📷📷</span>
          </Typography>
          <Button
            onClick={handleLogout}
            color="inherit"
            sx={{ color: "black", backgroundColor: "gray", "&:hover": { backgroundColor: "red" } }}
          >
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default Navbar
