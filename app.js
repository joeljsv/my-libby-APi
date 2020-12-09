const expres = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = expres();
const UserRoute = require("./api/routes/users")
const authRoute = require("./api/routes/auth")
const ProductRouter = require('./api/routes/product')
const OrderRoute = require('./api/routes/orders')
// const UserRouter=require('./api/routes/users');
const Verify=require("./api/routes/auth");


// mongoDb Connection  Ws3W4ZcgyjpdV4OY " + process.env.MONFO_ATLS_PW + "

mongoose.connect("mongodb+srv://tdtx:" + process.env.MONFO_ATLS_PW + "@shop-api.wl2hu.mongodb.net/DATABSE?retryWrites=true&w=majority", {

    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("the pass" + process.env.MONFO_ATLS_PW + "ggfgnffg");
    console.log("Not Connected to Database ERROR! ", err);
});


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors());

app.use("/",authRoute);



//browser response
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Orgin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Aollow-Methods', "PUT,POST,PATCH,DELETE,GET")
        return res.status(200).json({});
    }
    next()
})
// Docket io
app.get('/', (req, res) => {
    res.send("Node Server is running. Yay!!")
})



// route handels
app.use('/books', ProductRouter);
app.use('/orders', OrderRoute);
app.use("/user",UserRoute);
// app.use('/user', UserRouter);
app.use('/auth',Verify);    

// uplod img public
app.use('/uploads', expres.static('uploads'));
// error handeling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    console.log("errrr"+error);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;