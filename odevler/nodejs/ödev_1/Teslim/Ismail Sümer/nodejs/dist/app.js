import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
app.get('/data', (req, res) => {
    res.json("List of data");
});
//# sourceMappingURL=app.js.map