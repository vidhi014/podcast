import card from "./card.js";

export const getAllPodcastCardsController = async (req, res) => {
  try {
    const cards = await card.find().sort({ createdAt: -1 });
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch podcasts", error });
  }
};

export const getRecentPodcastCardsController = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentPodcasts = await card.find({
      createdAt: { $gte: sevenDaysAgo }
    }).sort({ createdAt: -1 }); 
    res.json(recentPodcasts);
  } catch (error) {
    console.error('Error fetching recent podcasts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPodcastCardByIdController = async (req, res) => {
  try {
    const podcast = await card.findById(req.params.id);
    if (!podcast) return res.status(404).json({ message: "Not found" });
    res.status(200).json(podcast);
  } catch (error) {
    res.status(500).json({ message: "Error fetching podcast", error });
  }
};

export const addPodcastCardController = async (req, res) => {
  try {
    const newCard = new card(req.body);
    const saved = await newCard.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Failed to add podcast", error });
  }
};

export const updatePodcastCardController = async (req, res) => {
  try {
    const updated = await card.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update", error });
  }
};

export const deletePodcastCardController = async (req, res) => {
  try {
    await card.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete", error });
  }
};

export const getPodcastCardsByCategoryController = async (req, res) => {
  try {
    const category = req.query.category;
    if (!category) { return res.status(400).json({ message: "Category is required in query params" }); }
    const cards = await card.find({ category }).sort({ createdAt: -1 });
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch podcasts by category", error });
  }
};
