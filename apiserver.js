const express = require("express");
const app = express();
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config();
const auth=require("./middlewares/auth")

app.use(express.static("."));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// /register , /login , /profile

app.post("/register", async (req, res) => {

    try {
        //req.body
        // name, username, password
        //req.body.name, req.body.username, req.body.password
        //Destructing
        const { name, username, password } = req.body;
        // validation & Sanitation
        if (!name || !username || !password) {
            return res.status(400).json({
                message: "All Fields are required.."
            })
        }
        //  name=name.trim();
        fs.readFile("./usersD.json", "utf-8", async (err, data) => {
            let users = [];
            console.log(data);

            if (err)
                users = [];
            else
                users = JSON.parse(data);

            const user = users.find(u => u.username == username);
            if (user) {
                return res.status(400).json({
                    message: "User Already exists"
                })
            }

            const hashedPassword = await bcrypt.hash(password, 10); // 2 power 10 async
            //halt
            users.push({
                name,
                username,
                password: hashedPassword
            });
            fs.writeFile("./usersD.json", JSON.stringify(users), (err) => {
                res.status(200).json({
                    message: "User Created..."
                })
            })




        })
    } catch (e) {

        res.status(500).json({ message: "Something wrong happened..." })
    }


})

app.post("/login",async  (req, res) => {


    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            message: "All fields are required..."
        })
    }

    fs.readFile("./usersD.json", "utf-8", async (err, data) => {
        let users = [];
        if (!err)
            users = JSON.parse(data);

        const user = users.find(u => u.username == username);
        if (!user) {
            return res.status(401).json({
                message: "Invalid username"
            })

        }

        const isMatched =await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(401).json({
                message: "Invalid password"
            })

        }

        const token = jwt.sign({
            email: user.username,
            name: user.name
        }, process.env.JWT_KEY,
            {
                expiresIn: "1h"
            })

            res.status(200).json({
                message:"Login ssuccess",
                token
            })

    })

})

app.get("/profile",auth,(req,res)=>{
    res.status(200).json({
        message:`welcome for profile ${req.user.name}` 
    })
})
app.listen(5000, (err) => {
    if (!err)
        console.log("Server Started...")
})
