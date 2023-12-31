const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./models/Register')

const app = express()
app.use(cors(
    {
        origin: ["https://test-mern-frontend.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.json())

//typle databasea
mongoose.connect('mongodb+srv://jgrey2550:Rq5GF6hwVRYtuutF@cluster0.qgvh47s.mongodb.net/?retryWrites=true&w=majority');

//my first database
//mongoose.connect('mongodb+srv://jgrey2550:test123@cluster0.wn5bc4z.mongodb.net/?retryWrites=true&w=majority');

//their database
//mongoose.connect('mongodb+srv://yousaf:test123@cluster0.g4i5dey.mongodb.net/?retryWrites=true&w=majority');

app.get("/", (req, res) => {
    res.json("Hello");
})
app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    RegisterModel.findOne({email: email})
    .then(user => {
        if(user) {
            res.json("Already have an account")
        } else {
            RegisterModel.create({name: name, email: email, password: password})
            .then(result => res.json(result))
            .catch(err => res.json(err))
        }
    }).catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("Server is Running")
})
