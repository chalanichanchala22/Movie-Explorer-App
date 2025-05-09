import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

function Login() {
  const { setUser } = useContext(MovieContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && password) {
      setUser({ username });
      navigate('/home');
    }
  };

  return (
    <Box 
      sx={{
        backgroundImage: 'url(/images/login.jpg)',
        backgroundSize: 'cover',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Container 
        maxWidth="sm" 
        sx={{ 
          maxHeight: '90vh',
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width:'50%',
            p: 6,
            boxShadow:3,
            borderRadius: 2,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(5px)',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button 
            variant="contained" 
            onClick={handleLogin}
            fullWidth
            sx={{ mt: 3, backgroundColor: '#bb8115', '&:hover': { backgroundColor: '#fffff' } }}
          >
            Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;