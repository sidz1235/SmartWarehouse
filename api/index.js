import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { User } from './models/User.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

dotenv.config();
const app = express();


const jwtSecret = "heyuwfdbjsdjlivjrjvwacfxrgeewrnt";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(helmet()); 

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{console.log('Connected to db successfully')})
.catch((err)=>{
    console.log('Issues in connectig with db');
    console.error(err); 
}) ;
 
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', async () => {
    console.log('Connected to MongoDB!');
    
});


app.post('/register', async (req, res) => {
    const { username, password, userType, companyName } = req.body;

    try {

        const collection = db.collection("Users");

        const user = ({
            username: username,
            password: password,
            userType: userType,
            companyName: companyName,
        });

        const result = await collection.insertOne(user);
        
        console.log(user);

        res.json({
            success:true,
            message:'Registration Succesfull',
            user,
        });
    }
    catch (e) {
        return res.status(422).json(e);
    }
});

app.get('/warehouse', async (req, res) => {
    try {
        const collection = db.collection("Warehouses");
        const warehouses = await collection.find({});
        const resArray = []
        
        for await (const doc of warehouses) {
            resArray.push(doc)
        }
        res.json(resArray);
    }
    catch(e) {
     
        res.json({message: "Uncool"});
    }
})

app.get('/temp', async (req, res) => {
    try {
        const collection = db.collection("Temps");
        const warehouses = await collection.find({});
        const resArray = []
        
        for await (const doc of warehouses) {
            resArray.push(doc)
        }
        res.json(resArray);
    }
    catch(e) {
     
        res.json({message: "Uncool"});
    }
})

app.get('/room', async (req, res) => {
    try {
        const collection = db.collection("Rooms");
        const warehouses = await collection.find({});
        const resArray = []
        
        for await (const doc of warehouses) {
            resArray.push(doc)
        }
        res.json(resArray);
    }
    catch(e) {
     
        res.json({message: "Uncool"});
    }
})

app.get('/item', async (req, res) => {
    try {
        const collection = db.collection("Items");
        const warehouses = await collection.find({});
        const resArray = []
        
        for await (const doc of warehouses) {
            resArray.push(doc)
        }
        res.json(resArray);
    }
    catch(e) {
     
        res.json({message: "Uncool"});
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const collection = db.collection("Users");
        const user = await collection.findOne({ username: username });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Please Register First',
            });
        }

        if (password === user.password) {
            const payload = {
                id: user._id,
            }

            const token = jwt.sign(payload, jwtSecret, {
                expiresIn: "8h",
            });

            // Add user data to the response
            const userData = {
                _id: user._id.toString(),
                username: user.username,
                password: user.password,
                companyName: user.companyName,
                userType: user.userType,
                // Include any other user data you want to return
            };

            console.log(userData);

            let options = { sameSite: 'none', secure: true };

            res.cookie('token', token, options).status(200).json({
                success: true,
                token,
                userData, // Include user data in the response
                message: 'Successfully LogIn',
            });
        } else {
            res.status(422).json({
                success: false,
                message: 'Password Not matched',
            });
        }
    } catch (e) {
        res.status(403).json({
            success: false,
            message: 'Login Failed'
        });
    }
});


app.get('/profile', async (req, res) => {
    const { token } = req.cookies;


    
    if(token){
        jwt.verify(token,jwtSecret,{},async (err,userData)=>{
            
            if (err) throw err

            const collection = db.collection("Users");
            //console.log(userData);
            const user = await collection.findOne({_id: new mongoose.Types.ObjectId(userData.id)});
            const {username,userType,companyName,_id} = user;
            //console.log(user);
            
            
            res.status(200).json({
                success:true,
                message:'In profile',
                username,
                userType,
                companyName,
                _id
            })
        })
    }
   
})


app.post('/logout', async (req, res) => {

    res.clearCookie('token', {
        path: '/',
        sameSite: 'none',
        secure: true,
        httpOnly: true,
    });

    res.status(200).json({
        success : true, 
        message : 'Logout successful', 
    });
});

app.listen(5000)