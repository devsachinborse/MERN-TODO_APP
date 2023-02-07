import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import router from './routes/todoRoutes.js';
import db from './config/db.js';



const app = express();


//server call
db();
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/',(req,res) => {
    res.send("Hello this is from server")
});

app.use('/api/v1', router);


 //server
 app.listen(process.env.PORT, (req,res) => {
    console.log("server is running on PORT", process.env.PORT);
})




