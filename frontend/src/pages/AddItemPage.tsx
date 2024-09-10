import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backend } from 'declarations/backend';
import { TextField, Button, Container, Typography, CircularProgress } from '@mui/material';

const AddItemPage: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await backend.addItem(
        title,
        description ? [description] : [],
        parseFloat(price),
        imageUrl
      );
      navigate('/');
    } catch (error) {
      console.error('Error adding item:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          margin="normal"
          type="number"
          required
        />
        <TextField
          fullWidth
          label="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Add Item'}
        </Button>
      </form>
    </Container>
  );
};

export default AddItemPage;
