import React, { useState, useEffect } from 'react';
import { CircularProgress, IconButton, Modal, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from '@mui/icons-material/Close';
import '../../src/Pages/style/Recent.css'

const Recent = ({ limit, theme }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [openPlayer, setOpenPlayer] = useState(false);  
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPodcast, setCurrentPodcast] = useState(null);
  const open = Boolean(anchorEl);
  
  const getRecentPodcasts = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/card/recent');
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
     
      setPodcasts(limit ? data.slice(0, limit) : data);
    } catch (error) {
      console.error("Error fetching recent podcasts:", error);
      setPodcasts([]); 
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    getRecentPodcasts();
  }, [limit]);


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
    getRecentPodcasts();
  }, [limit]);

  return (
    <>
    <div>
      <h2 style={{color:"white",marginLeft:"20px"}}>Recent Podcast</h2>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="wrapper">
          {podcasts.map((podcast) => (
            <div className="card" key={podcast._id}>
              <div style={{ width: "280px" }}>
                <div className="top">
                  <div classname="favourite">
                     <IconButton className="favourite">
                      <FavoriteIcon style={{width:"16px" , height:"16px"}}/>
                     </IconButton>
                    
                  </div>
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
      </div>
    </>
  );
};

export default Recent;