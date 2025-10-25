import { log } from "console"
import express, { type NextFunction, type Request, type Response } from "express"
import NewsDB from "../models/newsModel"

export const globalFilter = async (req:Request, res:Response, next:NextFunction) => {
    const url = req.url;
    const publicUrls = ['/', '/login', '/register'];
    
    // Swagger ve API endpoint'leri için public erişim
    const isApiEndpoint = url.startsWith('/api');
    const isSwaggerEndpoint = url.startsWith('/api-docs');
    const isSwaggerAssets = url.startsWith('/swagger-ui') || url.startsWith('/favicon.ico');

    if (publicUrls.includes(url) || isApiEndpoint || isSwaggerEndpoint || isSwaggerAssets) {
        return next();
    }

    const session = req.session.item;
    if (session) {
        res.locals.user = session;
        try {
            const latest = session.role === 'admin'
                ? await NewsDB.find({}).populate('userID', 'surname lastname email').sort({ date: -1 }).limit(5)
                : await NewsDB.find({ userID: session._id }).populate('userID', 'surname lastname email').sort({ date: -1 }).limit(5);
            res.locals.news = latest;
        } catch (e) {
            res.locals.news = [];
        }
        return next();
    }

    return res.redirect('/');
}