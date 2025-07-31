import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  CircularProgress,
  Box,
  Menu,
  MenuItem
} from '@mui/material';
import { PlayArrow, Add, Delete, Edit, MoreVert } from '@mui/icons-material';
import axios from 'axios';
import '../Pages/style/PodcastPlaylist.css';

const Playlist = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPodcast, setCurrentPodcast] = useState(null);
  const [newPodcast, setNewPodcast] = useState({
    title: '',
    description: '',
    creator: '',
    duration: '',
    audioUrl: '',
    imageUrl: '',
    category: 'General'
  });

  useEffect(() => {
    fetchPlaylist();
    fetchPodcasts();
  }, [playlistId]);

  const fetchPlaylist = async () => {
    try {
      const response = await axios.get(`/api/playlist`);
      setPlaylist(response.data);
    } catch (error) {
      console.error('Error fetching playlist:', error);
    }
  };

  const fetchPodcasts = async () => {
    try {
      const response = await axios.get(`/api/playlist/${playlistId}/podcasts`);
      setPodcasts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching podcasts:', error);
      setLoading(false);
    }
  };

  const handleMenuOpen = (event, podcast) => {
    setAnchorEl(event.currentTarget);
    setCurrentPodcast(podcast);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentPodcast(null);
  };

  const handleAddPodcast = async () => {
    try {
      await axios.post(`/api/podcast-playlists/${playlistId}/podcasts`, newPodcast);
      fetchPodcasts();
      setOpenDialog(false);
      setNewPodcast({
        title: '',
        description: '',
        creator: '',
        duration: '',
        audioUrl: '',
        imageUrl: '',
        category: 'General'
      });
    } catch (error) {
      console.error('Error adding podcast:', error);
    }
  };

  const handleDeletePodcast = async () => {
    try {
      await axios.delete(`/api/podcast-playlists/${playlistId}/podcasts/${currentPodcast._id}`);
      fetchPodcasts();
      handleMenuClose();
    } catch (error) {
      console.error('Error deleting podcast:', error);
    }
  };

  const handlePlayPodcast = (podcast) => {
    navigate('/podcast-player', { state: { podcast } });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" className="podcast-playlist-container">
      {playlist && (
        <>
          <div className="playlist-header">
            <Typography variant="h3" gutterBottom>
              {playlist.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {playlist.description}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
              sx={{ mb: 3 }}
            >
              Add Podcast
            </Button>
          </div>

          <Grid container spacing={3}>
            {podcasts.map((podcast) => (
              <Grid item xs={12} sm={6} md={4} key={podcast._id}>
                <Card className="podcast-card">
                  <CardMedia
                    component="img"
                    height="140"
                    image={podcast.imageUrl}
                    alt={podcast.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {podcast.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {podcast.creator} • {podcast.duration}
                    </Typography>
                    <Typography variant="body2" className="podcast-description">
                      {podcast.description}
                    </Typography>
                  </CardContent>
                  <div className="podcast-actions">
                    <IconButton onClick={() => handlePlayPodcast(podcast)}>
                      <PlayArrow />
                    </IconButton>
                    <IconButton onClick={(e) => handleMenuOpen(e, podcast)}>
                      <MoreVert />
                    </IconButton>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Podcast</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={newPodcast.title}
            onChange={(e) => setNewPodcast({...newPodcast, title: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={newPodcast.description}
            onChange={(e) => setNewPodcast({...newPodcast, description: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Creator"
            fullWidth
            value={newPodcast.creator}
            onChange={(e) => setNewPodcast({...newPodcast, creator: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Duration (mm:ss)"
            fullWidth
            value={newPodcast.duration}
            onChange={(e) => setNewPodcast({...newPodcast, duration: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Audio URL"
            fullWidth
            value={newPodcast.audioUrl}
            onChange={(e) => setNewPodcast({...newPodcast, audioUrl: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Image URL"
            fullWidth
            value={newPodcast.imageUrl}
            onChange={(e) => setNewPodcast({...newPodcast, imageUrl: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Category"
            fullWidth
            select
            SelectProps={{ native: true }}
            value={newPodcast.category}
            onChange={(e) => setNewPodcast({...newPodcast, category: e.target.value})}
          >
            {['General', 'Business', 'Technology', 'Science', 'Health', 'Entertainment'].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddPodcast}>Add Podcast</Button>
        </DialogActions>
      </Dialog>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleDeletePodcast}>
          <Delete fontSize="small" sx={{ mr: 1 }} /> Delete
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Edit fontSize="small" sx={{ mr: 1 }} /> Edit
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default Playlist;