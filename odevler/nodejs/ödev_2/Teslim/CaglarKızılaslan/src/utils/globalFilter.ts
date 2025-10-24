import express, { type NextFunction, type Request, type Response } from "express"

export const globalFilter = (req:Request, res:Response, next:NextFunction) => {
    const url = req.url
    const urls = ['/', '/login', '/register']
    let loginStatus = true
    urls.forEach((item) => {
        if(item == url) {
            loginStatus = false
        }
    })
    if (loginStatus) {
        // oturum denetimi olmalı
        const session = req.session.item
        if(session) {
            res.locals.user = session
            res.locals.notes = []
            next()
        }else {
            res.redirect('/')
        }
    }else {
        // oturum denetimi olmamalı
    }
    next() // alması gereken hizmeti almalı
}