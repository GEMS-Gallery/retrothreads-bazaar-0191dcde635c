import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Vintage Fashion Store
        </Typography>
        <Button color="inherit" component={Link} to="/add-item">
          Add Item
        </Button>
        <Button color="inherit" component={Link} to="/cart">
          <ShoppingCartIcon />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
