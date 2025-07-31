import express from 'express';
import { getAllPlaylistController,getPlaylistController,getPodcastPlaylistController,createPlaylistController,deletePlaylistController } from './playlistController.js';

const router = express.Router();

router.get('/',getAllPlaylistController);
router.get('/:playlistId',getPlaylistController);

router.get('/:playlistId/podcasts',getPodcastPlaylistController);

router.post('/', createPlaylistController);

router.delete('/:playlistId/podcasts/:podcastId', deletePlaylistController);

export default router;