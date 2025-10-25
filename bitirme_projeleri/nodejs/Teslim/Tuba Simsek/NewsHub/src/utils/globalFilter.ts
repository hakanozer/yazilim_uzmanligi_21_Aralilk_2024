import express, { NextFunction, Request, Response } from 'express'

export const globalFilter = async (req: Request, res: Response, next: NextFunction) => {
  const url = req.url
  const urls = ['/', '/login', '/register']
  let loginStatus = true
  urls.forEach((item) => {
    if(item == url) {
        loginStatus = false
    }
  })
 
}