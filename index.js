import express from "express";
import bodyParser from "body-parser";
import { Traveldatabase } from "./db/db_travel.js";

const app = express();
const port = 3000;


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET home page
app.get("/", async (req, res) => {
  const result = await Traveldatabase.query("SELECT province_code FROM visited_provinces");
  let provinces = [];
  result.rows.forEach((province) => {
    provinces.push(province.province_code);
  });
  console.log(result.rows);
  res.render("index.ejs",{ provinces: provinces});
});

//add new pin/location drop
app.post("/add", async (req, res) => {
  const newProvince = req.body.province;
  //check province code
    // const  checkProvince = await Traveldatabase.query(
    //     "SELECT province_code FROM visited_provinces WHERE province_code = ($1)", [newProvince]
    //   )
  //assume correct input type
  try {
    //insert into db and catch any errors
    const db_res = await Traveldatabase.query(
      "INSERT INTO visited_provinces (province_code) VALUES ($1)",[newProvince]
    );
    
    //redirect to main map
    console.log(db_res);
    res.status(200).redirect("/");
  } catch (error) {
    console.log(error);
    res.status(404).send("You have already visited that province");
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
