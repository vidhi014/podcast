import mongoose from 'mongoose';

const podcastPlaylistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  coverImage: String,
  isPublic: {
    type: Boolean,
    default: true
  }
});

const PlaylistModal = mongoose.model('Playlist', podcastPlaylistSchema);
export default PlaylistModal;