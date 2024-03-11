const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require("body-parser"); 
const datas = require("./models/reg.js");
const Hospitals = require("./models/hospitalData.js");


var http = require('http').Server(app);


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));4

// require('dotenv').config({ path: './config/config.env' });


app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const { getEnabledCategories } = require("trace_events");
const { Console } = require("console");


main().then(() => {
    console.log("Connected to the MongoDB database");
}).catch(() => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/mini');
}




const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) { 
      return cb(null, "./uploads"); //null => no condition check kro
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage });


// const methodOverride = require('method-override')    
// app.use(methodOverride('_method'))


app.listen(3000, () => {
    console.log(`Server is listening on port : 3000`);
    // console.log(`Server is listening on port : done`);
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.get("/newReg", (req, res) => {
    res.render("newReg.ejs");
});


// sign-up
app.post("/new", (req, res) => {
    let { name, email, password , pin, city, phone} = req.body;
    let newData = new datas({
        name: name,
        phone : phone,
        email: email,
        city  : city,
        pin : pin,
        password: password
    });
    console.log(newData);
    newData.save();
    res.render("login.ejs");
});


// checking auth
app.post("/check", async (req, res) => {
    try {
        let { email, password} = req.body;

        let foundData = await datas.findOne({ email: email });

        if (!foundData) {
            res.render("userNotFound.ejs", {data : "No User Found "});
        } else {
            if (foundData.password === password) {
                res.render("unique.ejs", {userID : foundData._id});
            } else {
                console.log(foundData);
                res.render("loginFail.ejs");
            }
        }
    } catch (err) {
        console.log(err);
        res.send("Error occurred");
    }
});

app.post("/search/:id/book", async (req, res) => {
    let {id} = req.params;
    let data = await Hospitals.findOne({ _id : id ,  });
    console.log(`ID : ${id} is selected`);
    console.log(`All data : ${data}`);

    res.render("bookSlot.ejs", {data, letter : letter = ["a1","a2", "b1", "b2", "c1","c2","d1","d2","e1","e2","f1","f2","g1","g2"],id });
});


app.post("/search/:id/book/:slot/payment", async (req, res) => {
    const { id, slot } = req.params;
    console.log(`Slot ID : ${slot} is selected`);
    try {
      const updatedHospital = await Hospitals.findOneAndUpdate(
        { _id: id },
        { $set: { [slot]: true } }, 
        { new: true }
      );
      res.redirect("/")


    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating slot.");
    }
  });



//   100% Danger!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.get("/dlt", async (req, res) => {
   await Hospitals.deleteMany({});
    res.render("login.ejs");
});

app.get("/emergency/book", async (req, res) => {
    res.render("emergencySelect.ejs");
});


app.get("/flow", (req, res) => {
    res.render("flow.ejs");
});

app.post("/FormFill", upload.single("img"), (req, res) => {
    let { city,
        pin,
        hospitalName,
        hospitalPhone1,
        hospitalPhone2,
        emergencyNumber,
        hospitalEmail1,
        hospitalEmail2,
        doctorName,
        specialization,
        doctorPhone,
        doctorEmail,
        docWorkingHour,
        consultingFree,
        img,
     } = req.body;

    
     let pathh = req.file.path;
     pathh = pathh.substring(8);


    let newData = new Hospitals({
        city : city,
        pin : pin,
        hospitalName : hospitalName,
        hospitalPhone1 : hospitalPhone1,
        hospitalPhone2 : hospitalPhone2,
        emergencyNumber : emergencyNumber,
        hospitalEmail1 : hospitalEmail1,
        hospitalEmail2 : hospitalEmail2,
        doctorName : doctorName,
        specialization : specialization,
        doctorPhone : doctorPhone,
        doctorEmail : doctorEmail,
        docWorkingHour : docWorkingHour,
        consultingFree : consultingFree,
        img : pathh
    })

    console.log(newData);
    console.log(pathh);
    newData.save();
    res.render("index.ejs");
});

app.get("/book", (req, res) => {
    res.render("book.ejs");
});

app.get("/profile", (req, res) => {
    res.send(`will complete this later on.......`);
});

app.get("/home", (req, res) => {
    res.render("index.ejs");
});


  // normal wale ke liye
app.post("/search", async (req, res) => {
    let { city, specialization } = req.body;

    const matchedHospitals = await  Hospitals.find({ city: city, specialization: specialization })
 
    if(matchedHospitals.length === 0){
        res.render("userNotFound.ejs", {data : "No Hospitals are avl. right now"});
    }
    res.render("show.ejs", {matchedHospitals});

});

  // emergency wale ke liye
app.post("/emergency/search", async (req, res) => {
    let { city, specialization } = req.body;

    const matchedHospitals = await  Hospitals.find({ city: city, specialization: specialization })
 
    if(matchedHospitals.length === 0){
        res.render("userNotFound.ejs", {data : "No Hospitals are avl. right now"});
    }
    res.render("emergencyShow.ejs", {matchedHospitals});
});


app.get("/FormFill", (req, res) => {
    res.render("hospitalDataInput.ejs");
});

const paymentRoute = require('./routes/paymentRoute');

app.use('/',paymentRoute);


app.get("/done", (req,res)=> {
    res.render("done.ejs");
})


app.post("/slip", async (req,res)=> {
    req.params
    try {
        let { userID } = req.body;

        let data = await datas.findOne({ _id : userID });
        console.log(data);
        res.render("slip.ejs", {name : data.name, email : data.email, phone : data.phone, ID : data._id});
      
    } catch (err) {
        console.log(err);
        res.send("Wrong ID");
    }

})





















// image multer usage
// app.post("/FormFill", upload.single("img"), (req, res) => {
//     console.log(req.body);
//     console.log("Andddd");
//     console.log(req.file);
//     res.render("hospitalDataInput.ejs");
// });


// let hospitalDataObjectsDelhi = [
//     {
//       city: "Delhi",
//       pin: 110001,
//       hospitalName: "Narayana Hospitals",
//       emergencyAvailable: "true",
//       hospitalPhone1: 7234723723,
//       hospitalPhone2: 9876543210,
//       hospitalEmail1: "info@narayanadelhi.com",
//       hospitalEmail2: "admin@narayanadelhi.com",
//       doctorName: "Dr. Gupta",
//       specialization: "Cardiology",
//       doctorPhone: 9998887770,
//       doctorEmail: "drgupta@narayanadelhi.com",
//       docWorkingHour: "9 AM - 5 PM",
//       consultingFree: 1200
//     }
//   ];

  



// let hospitalDataObjectsChandraGhaziabad = [
//     {
//       city: "Ghaziabad",
//       pin: 201001,
//       hospitalName: "Chandra Hospital and Medical Centre",
//       emergencyAvailable: "true",
//       hospitalPhone1: 7234723730,
//       hospitalPhone2: 9876543230,
//       hospitalEmail1: "info@chandrahospgzb.com",
//       hospitalEmail2: "admin@chandrahospgzb.com",
//       doctorName: "Dr. Akash Singh",
//       specialization: "Cardiology",
//       doctorPhone: 9998888300,
//       doctorEmail: "drakash@chandrahospgzb.com",
//       docWorkingHour: "9 AM - 5 PM",
//       consultingFree: 3200
//     },
//     {
//       city: "Ghaziabad",
//       pin: 201001,
//       hospitalName: "Chandra Hospital and Medical Centre",
//       emergencyAvailable: "true",
//       hospitalPhone1: 7234723731,
//       hospitalPhone2: 9876543231,
//       hospitalEmail1: "info@chandrahospgzb.com",
//       hospitalEmail2: "admin@chandrahospgzb.com",
//       doctorName: "Dr. Natasha Verma",
//       specialization: "Orthopedics",
//       doctorPhone: 9998888301,
//       doctorEmail: "drnatasha@chandrahospgzb.com",
//       docWorkingHour: "10 AM - 6 PM",
//       consultingFree: 3500
//     },
//     {
//       city: "Ghaziabad",
//       pin: 201001,
//       hospitalName: "Chandra Hospital and Medical Centre",
//       emergencyAvailable: "true",
//       hospitalPhone1: 7234723732,
//       hospitalPhone2: 9876543232,
//       hospitalEmail1: "info@chandrahospgzb.com",
//       hospitalEmail2: "admin@chandrahospgzb.com",
//       doctorName: "Dr. Rohan Gupta",
//       specialization: "Neurology",
//       doctorPhone: 9998888302,
//       doctorEmail: "drrohan@chandrahospgzb.com",
//       docWorkingHour: "8 AM - 4 PM",
//       consultingFree: 3300
//     },
//     {
//       city: "Ghaziabad",
//       pin: 201001,
//       hospitalName: "Chandra Hospital and Medical Centre",
//       emergencyAvailable: "true",
//       hospitalPhone1: 7234723733,
//       hospitalPhone2: 9876543233,
//       hospitalEmail1: "info@chandrahospgzb.com",
//       hospitalEmail2: "admin@chandrahospgzb.com",
//       doctorName: "Dr. Ananya Reddy",
//       specialization: "Oncology",
//       doctorPhone: 9998888303,
//       doctorEmail: "drananya@chandrahospgzb.com",
//       docWorkingHour: "10 AM - 6 PM",
//       consultingFree: 3400
//     },
//     {
//       city: "Ghaziabad",
//       pin: 201001,
//       hospitalName: "Chandra Hospital and Medical Centre",
//       emergencyAvailable: "true",
//       hospitalPhone1: 7234723734,
//       hospitalPhone2: 9876543234,
//       hospitalEmail1: "info@chandrahospgzb.com",
//       hospitalEmail2: "admin@chandrahospgzb.com",
//       doctorName: "Dr. Karishma Singh",
//       specialization: "Pediatrics",
//       doctorPhone: 9998888304,
//       doctorEmail: "drkarishma@chandrahospgzb.com",
//       docWorkingHour: "8 AM - 4 PM",
//       consultingFree: 3600
//     }
//   ];
  
//   // Inserting the data collections into the database for Chandra Hospital in Ghaziabad
//   Hospitals.insertMany(hospitalDataObjectsChandraGhaziabad)
//     .then(() => {
//       console.log("Data inserted successfully for Chandra Hospital in Ghaziabad");
//     })
//     .catch((err) => {
//       console.error("Error inserting data:", err);
//     });
  