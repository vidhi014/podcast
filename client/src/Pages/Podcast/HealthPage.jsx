import React,{ useState, useEffect } from 'react';
import HealthCard from '../Search/HealthCard';
import { CircularProgress,Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPodcasts, addPodcast } from '../../redux/slices/podcastSlice';


const HealthPage = () => {
  const dispatch = useDispatch();
  const { items: podcasts, status } = useSelector((state) => state.podcasts);
  const loading = status === 'loading';

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    creatorName: '',
    mediaType: 'video',
    category: 'Health',
    mediaUrl: ''
  });

  useEffect(() => {
    dispatch(fetchPodcasts('Health'))
  }, [dispatch]);

  const handleSubmit = async () => {
    try {
      await dispatch(addPodcast(formData)).unwrap();
      handleClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      setFormData({
        title: '',
        description: '',
        image: '',
        creatorName: '',
        mediaType: 'video',
        category: 'Health',
        mediaUrl: ''
      });
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  
  return (
    <div style={{ paddingLeft: "20px", paddingTop: "5px" }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: "white", marginBottom: "20px", position: 'sticky', top: 0, padding: '10px 0', zIndex: 1000 }}>
          Health
        </h2>
        <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={handleOpen}
          sx={{ backgroundColor: '#BE1ADB', marginRight: '30px', transition: 'all 0.4s ease-in-out',
            '&:hover': { backgroundColor: '#BE1ADB', transform: 'scale(1.05)', boxShadow: '0 4px 12px rgba(190, 26, 219, 0.3)' } }} >
          Add Podcast
        </Button>
      </Box>
       
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ padding: "20px", height: "500px", maxHeight: "1200px", overflowY: "auto" }}>  
          <HealthCard podcasts={podcasts} loading={loading} />
        </Box>
      )}


      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ backgroundColor: '#1C1E27', color: 'white', padding: '16px 24px', fontSize: '1.2rem' }}>
          Add New Health Podcast
        </DialogTitle>
        <DialogContent sx={{ padding: '24px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 2 }}>
            <TextField name="title" label="Title" value={formData.title} onChange={handleChange} fullWidth required variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'grey.300', }, '&:hover fieldset': { borderColor: 'primary.main', }, } }} />

            <TextField name="description" label="Description" value={formData.description} onChange={handleChange} multiline
              rows={4} fullWidth required variant="outlined" />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
              <TextField name="image" label="Image URL" value={formData.image} onChange={handleChange} fullWidth required variant="outlined" />
              <TextField name="creatorName" label="Creator Name" value={formData.creatorName} onChange={handleChange} fullWidth required variant="outlined" />
            </Box>

            <TextField name="mediaUrl" label="Media URL (YouTube or audio)" value={formData.mediaUrl} onChange={handleChange} fullWidth
              required variant="outlined" helperText="For YouTube videos, paste the full URL" />
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px', borderTop: '1px solid', borderColor: 'divider' }}>
          <Button onClick={handleClose} variant="outlined" sx={{ color: 'text.secondary', borderColor: 'grey.300', '&:hover': { borderColor: 'primary.main', } }} >
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary"
            disabled={!formData.title || !formData.description || !formData.image || !formData.creatorName || !formData.mediaUrl}
            sx={{ padding: '8px 24px', fontWeight: 'bold', textTransform: 'none', fontSize: '1rem' }} >
            Create Podcast
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HealthPage;
