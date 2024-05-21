import express from "express";
import { createShortUrl,deleteUrl,getAllUrls, getUrl, redirectUrl } from "../controllers/url.controllers.js";

const router=express.Router();

router.post("/create", createShortUrl);
router.get("/getAll",getAllUrls);
router.get("/:shortUrl",getUrl);
router.get("/redirect/:shortUrl",redirectUrl);
router.delete("/:shortUrl", deleteUrl);

export default router;