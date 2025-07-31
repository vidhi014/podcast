import Favorite from "./favourite.js"

export const getFavoriteController = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const favorites = await Favorite.find({ userId: req.user._id })
      .populate('podcastId') // Make sure this matches your schema
      .exec();

    // Return the entire favorite documents with populated podcast data
    res.json(favorites);
  } catch (err) {
    console.error('Error fetching favorites:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createFavoriteController = async (req, res) => {
  try {
    const { podcastId } = req.body;
    
    const existingFavorite = await Favorite.findOne({
      userId: req.user._id,  // Changed from 'user' to 'userId'
      podcastId: podcastId    // Changed from 'podcast' to 'podcastId'
    });

    if (existingFavorite) {
      return res.status(400).json({ message: 'Podcast already in favorites' });
    }

    const favorite = new Favorite({
      userId: req.user._id,   // Changed from 'user' to 'userId'
      podcastId: podcastId     // Changed from 'podcast' to 'podcastId'
    });

    await favorite.save();
    res.status(201).json(favorite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteFavoriteController = async (req, res) => {
  try {
    const deleted = await Favorite.findOneAndDelete({
      userId: req.user._id,
      podcastId: req.params.podcastId
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.json({ message: 'Removed from favorites' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};