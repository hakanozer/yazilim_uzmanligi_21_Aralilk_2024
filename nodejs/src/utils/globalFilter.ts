import express, { NextFunction, Request, Response } from 'express'
import { getLastFiveNotes } from '../services/noteService'

export const globalFilter = async (req: Request, res: Response, next: NextFunction) => {
  const url = req.url
  const urls = ['/', '/login', '/register']
  let loginStatus = true
  urls.forEach((item) => {
    if(item == url) {
        loginStatus = false
    }
  })
  if (loginStatus) {
    // oturum denetimi yap
    const session = req.session.item
    if (session) {
        const notesFive = await getLastFiveNotes(req)
        if(notesFive != null) {
          res.locals.notesFive = notesFive
        }
        res.locals.user = session
        res.locals.page_name = url.replace('/', '')
        next()
    }else {
        res.redirect('/')
    }
  }else {
    // oturum denetimi yapma
    next() // alması gereken hizmeti alsın
  }
  
}