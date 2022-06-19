const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

//  <!All Imported File >
const connectDB = require('./config/db');
const Shop = require('./models/ShopModel');

dotenv.config();
connectDB();
app.use(express.json());

app.use(cors({
    
}));



app.post('/create', async(req, res) => {
    const {  shopname,  area, category, opendate, closedate,} = req.body

    const shop = await Shop.create({

        ShopName: shopname,
        Area: area,
        Category: category,
        OpeningDate: opendate,
        ClosingDate: closedate,
   });

   console.log(shop);
   res.send(shop);
})

app.get('/allshops',async(req, res) => {
    const data = await Shop.find();
     console.log({data});  
     res.send(data);  

})

app.delete('/allshops/:id', async(req, res) => {
    const { id } = req.params;
    const data = await Shop.findByIdAndDelete(id);
    console.log(data);
})

// _________________________________Deployment to Heroku________________________________________
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
     app.use(express.static(path.join(__dirname, "/client/build")));
      app.get("*", (req, res)=>{
          res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
      });

}else{

  app.get('/', (req, res) => {
res.send("API is running");
  });
}




const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log('Server is running on port 9000');
})