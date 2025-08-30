import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
// get - mvc
app.get('/data', (req, res) => {
    res.status(200).json({ message: 'Hello, World!!!' });
});
app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map