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

dashboardController.post("/dashboard", async(requestAnimationFrame,)) => {

}


