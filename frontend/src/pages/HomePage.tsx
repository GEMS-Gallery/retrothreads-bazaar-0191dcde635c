import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { backend } from 'declarations/backend';
import { Grid, Card, CardContent, CardMedia, Typography, Button, CircularProgress } from '@mui/material';

interface Item {
  id: bigint;
  title: string;
  description: string | null;
  price: number;
  imageUrl: string;
}

const HomePage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const result = await backend.getItems();
        setItems(result.map(item => ({
          ...item,
          id: Number(item.id),
          price: Number(item.price)
        })));
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (items.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        No items available. Please add some items to the store.
      </Typography>
    );
  }

  return (
    <Grid container spacing={3} padding={3}>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={Number(item.id)}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={item.imageUrl}
              alt={item.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ${item.price.toFixed(2)}
              </Typography>
              <Button component={Link} to={`/item/${item.id}`} variant="contained" color="primary" sx={{ mt: 2 }}>
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default HomePage;
