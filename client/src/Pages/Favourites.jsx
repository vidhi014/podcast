import React, { useEffect, useState } from 'react';
import './style/ComedyCard.css';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton, Avatar, CircularProgress } from '@mui/material';

const Favourites = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavourites();
  }, []);

  const fetchFavourites = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:4000/api/favorite', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!res.ok) throw new Error('Failed to fetch favorites');
      
      const data = await res.json();
      
      // Assuming the API returns an array of favorite objects with podcast details populated
      if (data.length > 0 && data[0].podcast) {
        setPodcasts(data.map(fav => fav.podcast));
      } else {
        // Fallback: Fetch each podcast individually if not populated
        const podcastDetails = await Promise.all(
          data.map(fav => 
            fetch(`http://localhost:4000/api/card/${fav.podcastId}`, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            }).then(res => res.json())
          )
        );
        setPodcasts(podcastDetails);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className="wrapper">
      {podcasts.length === 0 ? (
        <p style={{ color: "white" }}>No favorites yet.</p>
      ) : (
        podcasts.map(podcast => (
          <div className="card" key={podcast._id}>
            <div style={{ width: "280px" }}>
              <div className="top">
                <div className="favourite">
                  <IconButton className="favourite">
                    <FavoriteIcon style={{ color: "red", width: "16px", height: "16px" }} />
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
          </div>
        ))
      )}
    </div>
  );
};

export default Favourites;