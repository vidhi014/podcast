import express from "express";
import { getAllPodcastCardsController, getPodcastCardByIdController, addPodcastCardController,
  updatePodcastCardController, deletePodcastCardController, getPodcastCardsByCategoryController,getRecentPodcastCardsController } from "./cardController.js";

const router = express.Router();

router.get("/", getAllPodcastCardsController)
router.get('/recent',getRecentPodcastCardsController);
router.get("/category/filter", getPodcastCardsByCategoryController);
router.get("/:id", getPodcastCardByIdController);
router.post("/", addPodcastCardController);
router.put("/:id", updatePodcastCardController);
router.delete("/:id", deletePodcastCardController);



export default router;
