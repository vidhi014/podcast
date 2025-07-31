import express  from 'express';
import PodcastPlaylist from './playlist.js';
import card from "../card/card.js";

export const getPlaylistController=[ async (req, res) => {
  try {
    const playlist = await PodcastPlaylist.findById(req.params.playlistId);
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}];

export const getAllPlaylistController=[ async (req, res) => {
  try {
    const playlist = await PodcastPlaylist.find();
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}];

export const getPodcastPlaylistController=[ async (req, res) => {
  try {
    const podcasts = await card.find({ playlist: req.params.playlistId });
    res.json(podcasts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}];


export const createPlaylistController=[async (req, res) => {
  try {
    const podcast = new PodcastPlaylist({
      name: req.body.name,
      description: req.body.description,
      createdBy: req.body.createdBy,
      createdAt: req.body.createdAt,
      coverImage: req.body.coverImage,
      isPublic: req.body.isPublic
    });

    const newPodcast = await podcast.save();
    res.status(201).json(newPodcast);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}];

export const deletePlaylistController=[async (req, res) => {
  try {
    const podcast = await card.findOneAndDelete({
      _id: req.params.podcastId,
      playlist: req.params.playlistId
    });
    
    if (!podcast) {
      return res.status(404).json({ message: 'Podcast not found' });
    }
    
    res.json({ message: 'Podcast deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}];
