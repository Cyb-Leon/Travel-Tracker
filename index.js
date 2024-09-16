import express, { json } from "express";
import bodyParser from "body-parser";
import { Traveldatabase } from "./db/db_travel.js";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//travelled 
async function checkVisited() {
  const result = await Traveldatabase.query(
    "SELECT * FROM visited_provinces"
  );
  let provincesVisited = [];
  result.rows.forEach((province) => {
    provincesVisited.push(province);
  });

  return provincesVisited;
}

//existing provinces of South African database
async function saProvinces() {
  const result = await Traveldatabase.query(
    "SELECT * FROM sa_provinces"
  );
  let sa_provinces = [];
  result.rows.forEach((province) =>{
    sa_provinces.push(province);
  });
  
  return sa_provinces;
}
// GET home page
app.get("/", async (req, res) => {

  let visited_provinces = await checkVisited();
  
  res.render("index.ejs", { provinces: visited_provinces, errorMessage: "", statusError: "style=visibility:hidden;"});
});

//add new pin/location drop
app.post("/add", async (req, res) => {
  const newProvince = req.body.province;
  let sa_provinces  = await saProvinces(); 

  if (newProvince !== "") {
    try {
      //check province code with visited provinces
      const checkProvince = await Traveldatabase.query(
        "SELECT province_name FROM visited_provinces WHERE LOWER(province_name) = $1",[newProvince.toLowerCase()]
      );
 
      //store new visisted province
      let visitednewProv = sa_provinces.find( (sa_province) =>  sa_province.prov_code == newProvince);
  
      //insert into db and catch any errors
      console.log(visitednewProv);
      const db_res = await Traveldatabase.query(
        "INSERT INTO visited_provinces (province_code,province_name) VALUES ($1,$2)",[visitednewProv.prov_code, visitednewProv.prov_name]
      );

      //redirect to main map
      res.status(200).redirect("/");
    } catch (error) {
      console.log(error);
      const visited_provinces = await checkVisited();
      res.render("index.ejs", {
        provinces: visited_provinces,
        errorMessage:
          "We've either entered a stupid or We've already visited the place",
        statusError: "style=visibility:visible;"
      });
    }
  } else {
    const visited_provinces = await checkVisited();

    res.render("index.ejs", {
      provinces: visited_provinces,
      errorMessage: "The thing is empty fam!!",
      statusError: "style=visibility:visible;"
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

