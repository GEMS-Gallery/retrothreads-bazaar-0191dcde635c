import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { backend } from 'declarations/backend';
import { Container, Typography, Button, CircularProgress, Box } from '@mui/material';

interface Item {
  id: bigint;
  title: string;
  description: string | null;
  price: number;
  imageUrl: string;
}

const ItemDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        if (id) {
          const result = await backend.getItem(BigInt(id));
          if (result.length > 0) {
            setItem({
              ...result[0],
              id: Number(result[0].id),
              price: Number(result[0].price)
            });
          }
        }
      } catch (error) {
        console.error('Error fetching item:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleAddToCart = async () => {
    if (item) {
      try {
        setLoading(true);
        await backend.addToCart('user123', BigInt(item.id)); // Replace 'user123' with actual user ID
        navigate('/cart');
      } catch (error) {
        console.error('Error adding item to cart:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!item) {
    return <Typography>Item not found</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <img src={item.imageUrl} alt={item.title} style={{ maxWidth: '100%', height: 'auto' }} />
        <Typography variant="h4" component="h1" gutterBottom mt={2}>
          {item.title}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          ${item.price.toFixed(2)}
        </Typography>
        <Typography variant="body1" paragraph>
          {item.description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Add to Cart'}
        </Button>
      </Box>
    </Container>
  );
};

export default ItemDetailsPage;
