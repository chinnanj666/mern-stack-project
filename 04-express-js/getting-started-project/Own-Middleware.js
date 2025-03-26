// const express = require('express');
// const app = express();
// const PORT = 3010;
//
// // Logger middleware
// function logger(req, res, next) {
//     const timestamp = new Date().toISOString();
//     console.log(`[${timestamp}] ${req.method} ${req.url} - ${req.path}`);
//     next();
// }
//
// app.use(logger);
//
// app.get('/public', (req, res) => {
//     res.send('Hello World from public');
// });
//
// app.get('/private', (req, res) => {
//     res.send('Hello World from private');
// });
//
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
//
//
//




const express = require('express');
const app = express();
const PORT = 3010;

// Logger middleware
function logger(req, res, next) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url} - ${req.path}`);
    next();
}

// Request log middleware
function requestlog(req, res, next) {
    req.requestlog = new Date().toISOString();
    console.log(`Request logged at: ${req.requestlog}`);
    next();
}

function responseHandler(req, res, next) {
    const originalSend = res.send;
    res.send = function (body) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] Response sent: ${body}`);
        const responseBody = {
            note: "Processing Successful!",
            status: res.statusCode,
            message: body,
        };
        return originalSend.call(this, responseBody);
    };
    next();
}

app.use(logger);
app.use(requestlog);
app.use(responseHandler);

app.get('/public', (req, res) => {
    res.send('Hello World from public');
});
app.get('/private', (req, res) => {
    res.send('Hello World from private');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

