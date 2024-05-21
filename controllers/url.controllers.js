import Url from "../models/url.model.js";

const createShortUrl=async(req,res,next)=>{
    try {
        const {orgUrl}=req.body;
        const shortUrl=Math.random().toString(16).substring(2,7);

        if(!orgUrl){
            res.status(400);
            return next(new Error("originalUrl is required"));
        }

        const isUrlExists=await Url.findOne({orgUrl});

        if(isUrlExists) {
            res.status(400);
            return next(new Error("This url already exists"));
        }

        const newUrl=await Url.create({
            orgUrl,
            shortUrl
        });

        return res.status(201).json({
            success:true,
            newUrl
        })

    } catch (err) {
        console.log(err.message);
        res.status(500).json("Internal Server Error");
    }
}

const getAllUrls=async(req,res,next)=>{
    try {
        const urls=await Url.find({});
        if(urls.length<1) return res.status(400).json("No urls found");

        return res.status(200).json({
            success:true,
            urls
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json("Internal Server Error");
    }
} 

const getUrl=async(req,res,next)=>{
    const {shortUrl}=req.params;
    if(!shortUrl) return res.status(400).json("shortUrl is required for this request");

    try {

        const url=await Url.findOne({shortUrl});
        if(!url) return res.status(404).json("Url not found");

        return res.status(200).json(url);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json("Internal Server Error");
    }
}

const redirectUrl=async(req,res,next)=>{
    const {shortUrl}=req.params;
    if(!shortUrl){
        return res.status(400).json("Url not found");
    }

    try {

        const url=await Url.findOne({shortUrl});
        if(!url) return res.status(404).json("Url not found");

        return res.status(301).redirect(url.orgUrl);
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
}

const deleteUrl=async(req,res,next)=>{
    const {shortUrl}=req.params;
    if(!shortUrl) return res.status(400).json("shortUrl is required for this request");

    try {
        const deleteUrl=await Url.findOneAndDelete({shortUrl});
        if(!deleteUrl) return res.status(404).json("Url not found");

        return res.status(200).json(deleteUrl);
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Internal Server Error");
    }
}

export {createShortUrl, getAllUrls, getUrl, redirectUrl, deleteUrl};