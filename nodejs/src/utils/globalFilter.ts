import express, { NextFunction, Request, Response } from 'express'

export const globalFilter = (req: Request, res: Response, next: NextFunction) => {
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
  }else {
    // oturum denetimi yapma
    next() // alması gereken hizmeti alsın
  }
  
}