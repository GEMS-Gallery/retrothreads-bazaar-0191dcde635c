import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { Container, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface CartItem {
  id: bigint;
  title: string;
  price: number;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const result = await backend.getCart('user123'); // Replace 'user123' with actual user ID
        setCartItems(result.map(item => ({
          ...item,
          id: Number(item.id),
          price: Number(item.price)
        })));
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveItem = (id: number) => {
    // Implement remove item functionality
    console.log('Remove item:', id);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <List>
          {cartItems.map((item) => (
            <ListItem key={Number(item.id)}>
              <ListItemText
                primary={item.title}
                secondary={`$${item.price.toFixed(2)}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveItem(Number(item.id))}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default CartPage;
