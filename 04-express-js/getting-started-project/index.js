const express = require('express');
const app = express();

// middleware functions
app.use(express.json()); // we can also use (body-parser)
app.get('/post-req', (req, res) => {
   console.log(req.json)
    res.json({"message": "Hello World"});
})

const port = 9999;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
})
