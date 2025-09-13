import express  from "express"

export const dashboardController = express.Router()

dashboardController.get("/", (req, res) => {
    const session = req.session.item
    if (session) {
        res.render('dashboard')
    }else {
        res.redirect('/')
    }
})

dashboardController.post("/dashboard", async(req, res)) => {

}


function async(req: any, res: any): import("express-serve-static-core").RequestHandler<{}, any, any, import("qs").ParsedQs, Record<string, any>> {
    throw new Error("Function not implemented.")
}

