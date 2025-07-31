import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  podcastId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Podcast',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


favoriteSchema.index({ userId: 1, podcastId: 1 }, { unique: true });

const FavoriteModal = mongoose.model('Favorite', favoriteSchema);
export default FavoriteModal;