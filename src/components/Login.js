import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/MovieContext';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';

function Login() {
  const { setUser } = useContext(MovieContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Valid credential
  const validCredential = { username: 'user', password: 'movie2025' };

  const handleLogin = () => {
    setError('');
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    // Check if credentials match
    if (username === validCredential.username && password === validCredential.password) {
      setUser({ username });
      navigate('/home');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
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
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: { xs: '100%', sm: '80%', md: '70%' },
            mx: 'auto',
            p: 6,
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(5px)',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            fullWidth
            margin="normal"
          />
          <Button 
            variant="contained" 
            onClick={handleLogin}
            fullWidth
            sx={{ mt: 3, backgroundColor: '#bb8115', '&:hover': { backgroundColor: '#a06e10' } }}
          >
            Login
          </Button>
          
        </Box>
      </Container>
    </Box>
  );
}

export default Login;