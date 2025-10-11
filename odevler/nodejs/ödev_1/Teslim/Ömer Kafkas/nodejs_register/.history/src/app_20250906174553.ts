import express from 'express';


const app = express();
const port = process.env.PORT || 3000;

app.get('/data', (_req, res) => {
    res.status(200).json({message: 'Hello, World!'});
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);