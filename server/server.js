const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt")
const cors = require('cors');

const app = express()
app.use(cors())
app.use(express.json())

const UserDetailSchema = new mongoose.Schema({
    Email: { type: String, unique: true },
    Name: String,
    Password: String,
    phno: { type: Number, unique: true },
    Acces: String
})

const ProductionSchema = new mongoose.Schema({
    Email: String,
    Paystatus: { type: Boolean, default: false },
    Amt: Number,
    date: String,
    Listofitm: {
        dir1: Number,
        dir2: Number,
        dir3: Number,
    }
})

const UserDetail = mongoose.model('Detail', UserDetailSchema)
const Production = mongoose.model('Production', ProductionSchema)

mongoose.connect("mongodb+srv://portfolio:portfolio@cluster0.84kv7m8.mongodb.net/Affordment?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to database")
}).catch((err) => {
    // console.error(err)
})

const connection = mongoose.connection;
connection.once('open', () => console.log("MongoDB Connected..."))
// hashing pass
const saltRounds = 10;

const hashPassword = async (plainPassword) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password: ' + error.message);
    }
};
// signup
app.post('/newdetail', async (req, res) => {
    try {
        const { Name, Email, Phno, Password } = req.body
        const hashedPassword = await hashPassword(Password)
        const newUserDetail = new UserDetail({
            Email: Email,
            Name: Name,
            Password: hashedPassword,
            phno: Phno,
            Acces: "customer"
        });

        await newUserDetail.save()
        res.status(201).json({
            "status": "success"
        });
    } catch (e) {
        res.json({
            "error": e
        })
        console.log(e);
    }
})
//login 

app.post('/login', async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const user = await UserDetail.findOne({ Email: Email });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isPasswordValid = bcrypt.compare(Password, user.Password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        res.status(200).json({ status: "success", message: "Login successful" });
    } catch (e) {
        res.status(500).json({
            "error": e.message
        });
        console.log(e);
    }
})

app.post('/additem', async (req, res) => {
    try {
        const { Email, Listofitm, Amt, date } = req.body
        const newProduction = new Production({
            Email: Email,
            Amt: Amt,
            date: date,
            Listofitm: Listofitm
        });
        await newProduction.save();
        res.status(201).json({
            "status": " item added"
        });
    } catch (e) {
        res.status(500).json({
            "error": e
        });
        // console.log(e);
    }
});
// get all production
app.get("/get-production-details", async (req, res) => {
    try {
        // const {Email}=req.body
        const product = await Production.find();
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
});
