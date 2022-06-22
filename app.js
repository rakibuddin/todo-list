const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  const today = new Date();
  const options = {weekday: "long", day: "numeric", month: "long"};

  let day = today.toLocaleDateString("en-US", options);

  res.render("list", {kindOfDay: day, newListItems: items});

});

app.post("/", function(req, res){

  let item = req.body.newItem;

  if (item) {
    items.push(item);
  } else {
    items.pop(item);
  }

  res.redirect("/");

});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
