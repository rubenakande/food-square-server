const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path');
const cors = require('cors')

const {MONGOURI} = require('./config/keys')
//const PORT = 5000;
const PORT = process.env.PORT || 4000;
const app = express()
app.use(cors())
mongoose.connect(MONGOURI,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    } 
)
mongoose.connection.on('connected',()=>{
    console.log(`Application connected successfully to ${MONGOURI}!`);
})
mongoose.connection.on('error', (err)=>{
    console.log("error connecting", err)
})// failed connection

//Import models
require('./models/cart') 
require('./models/checkout') 
require('./models/foodItems') 
require('./models/stock') 
require('./models/user') 

app.use(express.json())

app.use(morgan('tiny'));
// Import router
app.use(require('./routes/home'))
app.use(require('./routes/registerfood'))
app.use(require('./routes/auth'))
app.use(require('./routes/productdetails'))
app.use(require('./routes/productcategory'))
app.use(require('./routes/addtocart'))
app.use(require('./routes/getmycart'))


// app.use(express.static('client/build'))
// app.get('/*', function(req, res){
//     res.sendFile(path.join(__dirname,'/client/build/index.html'));
// })
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('/*', function(req, res){
        res.sendFile(path.join(__dirname +'/client/build/index.html'));
    })
}

app.listen(PORT,()=>{
    console.log("Server is running on", PORT)
})