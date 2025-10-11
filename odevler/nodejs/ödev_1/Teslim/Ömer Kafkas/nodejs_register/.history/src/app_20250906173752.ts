import express from 'express';


const app = express();
const port = process.env.PORT || 3000;

app.get('/data', (req, res) => {
    res.status(200)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);