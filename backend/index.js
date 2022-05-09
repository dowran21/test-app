require('dotenv').config()
const express = require("express")
const app  = express()
const cors = require("cors")
const cookieParser = require('cookie-parser')
const morgan = require("morgan")
const path = require('path')
// const Router = require('./router/index.js')
const AdminRouter = require("./routes/AdminRouters")
const GuestRouter = require("./routes/GuestRouter")

const port = process.env.PORT || 3000

app.use(morgan("dev"))   


const allowedOrigins = ['http://localhost:3000', 'http://141.136.44.10:5000']
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({limit: '500000kb', extended : true}));

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false); 
        }
        return callback(null, true);
        },
    credentials: true
}));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use("/api",GuestRouter)
app.use('/api/admin', AdminRouter)


app.use(express.static(path.join(__dirname, 'build')))
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});





app.listen(port, () => console.log(`Your server started and listening on port ${port}`))