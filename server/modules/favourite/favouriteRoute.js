import { getFavoriteController,createFavoriteController, deleteFavoriteController } from "./favouriteController.js";
import {Router} from "express";
// import from "../../middleware/authMiddleware.js";

const router=Router();

router.get("/",getFavoriteController);
router.post("/",createFavoriteController);
router.delete("/:podcastId",deleteFavoriteController);

export default router;