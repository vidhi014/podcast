import React, { useState, useEffect } from 'react';
import { CircularProgress, IconButton, Modal, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CloseIcon from '@mui/icons-material/Close';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import '../style/ComedyCard.css';
import { useDispatch } from 'react-redux';
import { updatePodcast } from '../../redux/slices/podcastSlice';

const ComedyCard = ({ limit ,theme}) => {
  const [podcasts, setPodcasts] = useState([]);
   const [loading, setLoading] = useState(false);
   const [selectedPodcast, setSelectedPodcast] = useState(null);
   const [openPlayer, setOpenPlayer] = useState(false);
   const [openEditDialog, setOpenEditDialog] = useState(false);
   const [formData, setFormData] = useState({
     title: '',
     description: '',
     image: '',
     creatorName: '',
     mediaType: 'video',
     category: 'Comedy',
     mediaUrl: ''
   });
   const dispatch = useDispatch();
 
   const getallpodcasts = async () => {
     setLoading(true);
     try {
       const res = await fetch(`http://localhost:4000/api/card/category/filter?category=Comedy`);
       const data = await res.json();
       setPodcasts(limit ? data.slice(0, limit) : data);
     } catch (error) {
       console.error("Error fetching Comedy podcasts:", error);
     }
     setLoading(false);
   };
 
   const handleDelete = async (podcastId) => {
     try {
       const response = await fetch(`http://localhost:4000/api/card/${podcastId}`, {
         method: 'DELETE',
       });
       
       if (response.ok) {
         setPodcasts(podcasts.filter(podcast => podcast._id !== podcastId));
       } else {
         console.error('Failed to delete podcast');
       }
     } catch (error) {
       console.error('Error deleting podcast:', error);
     }
   };
 
   const handleOpenEditDialog = (podcast) => {
     setFormData({
       title: podcast.title,
       description: podcast.description,
       image: podcast.image,
       creatorName: podcast.creatorName,
       mediaType: podcast.mediaType,
       category: podcast.category,
       mediaUrl: podcast.mediaUrl
     });
     setSelectedPodcast(podcast);
     setOpenEditDialog(true);
   };
 
   const handleCloseEditDialog = () => {
     setOpenEditDialog(false);
     setSelectedPodcast(null);
   };
 
 const handleEditSubmit = async () => {
   try {
     if (!selectedPodcast?._id) {
       throw new Error('No podcast selected for update');
     }
 
     const resultAction = await dispatch(updatePodcast({ 
       id: selectedPodcast._id,
       data: formData 
     }));
 
     if (updatePodcast.fulfilled.match(resultAction)) {
       setPodcasts(podcasts.map(podcast => 
         podcast._id === selectedPodcast._id ? resultAction.payload : podcast
       ));
       handleCloseEditDialog();
     } else {
       console.error('Update failed:', resultAction.payload);
       alert(`Update failed: ${resultAction.payload}`);
     }
   } catch (error) {
     console.error('Error updating podcast:', error);
     alert(`Error: ${error.message}`);
   }
 };
 
   const handleChange = (e) => {
     const { name, value } = e.target;
     setFormData(prev => ({ ...prev, [name]: value }));
   };
 
   const handlePlayClick = (podcast) => {
     setSelectedPodcast(podcast);
     setOpenPlayer(true);
   };
 
   const handleClosePlayer = () => {
     setOpenPlayer(false);
     setSelectedPodcast(null);
   };
 
   const getEmbedUrl = (url) => {
     if (!url) return '';
     if (url.includes('youtube.com/watch')) {
       const videoId = url.split('v=')[1];
       const ampersandPosition = videoId.indexOf('&');
       if (ampersandPosition !== -1) {
         return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
       }
       return `https://www.youtube.com/embed/${videoId}`;
     }
     return url;
   };
 
   useEffect(() => {
     getallpodcasts();
   }, [limit]);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="wrapper">
          {podcasts.map((podcast) => (
            <div className="card" key={podcast._id}>
              <div className="delete-icon-container">
                
                <IconButton 
                  onClick={() => handleOpenEditDialog(podcast)}
                  sx={{ 
                    color: 'white',
                    padding: '4px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  <ModeEditOutlineRoundedIcon fontSize="small" />
                </IconButton>
                
                {/* Delete Button */}
                <IconButton 
                  onClick={() => handleDelete(podcast._id)}
                  sx={{ 
                    color: 'white',
                    padding: '4px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  <DeleteRoundedIcon fontSize="small" />
                </IconButton>
              </div>

              <div style={{ width: "280px" }}>
                <div className="top">
                  <img className="card-image" src={podcast.image} alt={podcast.title} />
                </div>
                <div className="card-information">
                  <div className="main-info">
                    <div className="title">{podcast.title}</div>
                    <div className="description">{podcast.description}</div>
                    <div className="creaters-info">
                      <div className="creator">
                        <Avatar style={{ width: "23px", height: "23px" }}>
                          {podcast.creatorName?.[0]}
                        </Avatar>
                        <div className="creator-name">{podcast.creatorName}</div>
                      </div>
                      <div className="views">{podcast.views} Views</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="play-icon" onClick={() => handlePlayClick(podcast)}>
                {podcast.mediaType === "video" ? (
                  <PlayArrowIcon style={{ width: "28px", height: "28px" }} />
                ) : (
                  <HeadphonesIcon style={{ width: "28px", height: "28px" }} />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

 <Dialog open={openEditDialog} onClose={handleCloseEditDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ backgroundColor: '#1C1E27', color: 'white', padding: '16px 24px', fontSize: '1.2rem' }}>
          Edit Podcast
        </DialogTitle>
        <DialogContent sx={{ padding: '24px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 2 }}>
            <TextField name="title" label="Title" value={formData.title} onChange={handleChange} fullWidth required variant="outlined" />
            <TextField name="description" label="Description" value={formData.description} onChange={handleChange} multiline rows={4} fullWidth required variant="outlined" />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
              <TextField name="image" label="Image URL" value={formData.image} onChange={handleChange} fullWidth required variant="outlined" />
              <TextField name="creatorName" label="Creator Name" value={formData.creatorName} onChange={handleChange} fullWidth required variant="outlined" />
            </Box>
            <TextField name="mediaUrl" label="Media URL (YouTube or audio)" value={formData.mediaUrl} onChange={handleChange} fullWidth required variant="outlined" helperText="For YouTube videos, paste the full URL" />
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px', borderTop: '1px solid', borderColor: 'divider' }}>
          <Button onClick={handleCloseEditDialog} variant="outlined" sx={{ color: 'text.secondary', borderColor: 'grey.300', '&:hover': { borderColor: 'primary.main' } }} >
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} variant="contained" color="primary"
            disabled={ !formData.title || !formData.description || !formData.image || !formData.creatorName || !formData.mediaUrl }
            sx={{ padding: '8px 24px', fontWeight: 'bold', textTransform: 'none', fontSize: '1rem' }} >
            Update Podcast
          </Button>
        </DialogActions>
      </Dialog>


       <Modal
              open={openPlayer}
              onClose={handleClosePlayer}
              aria-labelledby="media-player-modal"
              aria-describedby="media-player-modal-description"
            >
        <Box className="modal-container">
          <div className="modal-header">
            <h2 className="modal-title">{selectedPodcast?.title}</h2>
            <IconButton onClick={handleClosePlayer}>
              <CloseIcon style={{color:"white"}}/>
            </IconButton>
          </div>
          {selectedPodcast?.mediaType === "video" ? (
            <div className="media-player">
              <iframe
                src={getEmbedUrl(selectedPodcast?.mediaUrl)}
                title={selectedPodcast?.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="media-player">
              <audio controls style={{ width: '100%' }}>
                <source src={selectedPodcast?.mediaUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
          <div style={{ marginTop: '16px' }}>
            <p style={{ color: '#ffffff90', margin: '8px 0' }}>{selectedPodcast?.description}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Avatar style={{ width: "32px", height: "32px" }}>
                {selectedPodcast?.creatorName?.[0]}
              </Avatar>
              <span style={{ color: '#ffffff' }}>{selectedPodcast?.creatorName}</span>
            </div>
          </div>
        </Box>
      </Modal>
   
    </>
  );
};

export default ComedyCard;

