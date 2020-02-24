const path = require("path");
const express = require("express");
const morgan = require("morgan");
const redis = require("redis");
const methodOverride = require("method-override");
const exphbs = require("express-handlebars");

const winston = require("./config/winston");

const PORT = process.env.PORT || 3000;

const app = express();
const client = redis.createClient();
client.on("connect", () => console.log("connected to redis"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(methodOverride("_method"));
app.use(morgan("tiny", { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "./views")));

app.get("/", (req, res) => {
  res.render("searchusers");
});

app.get("/user/add", (req, res) => {
  res.render("addUser");
});

app.post("/user/add", (req, res) => {
  const { id, first_name, last_name, phone, email } = req.body;
  const user = { id, first_name, last_name, phone, email };
  client.hmset(
    id,
    [
      "first_name",
      first_name,
      "last_name",
      last_name,
      "phone",
      phone,
      "email",
      email
    ],
    (err, reply) => {
      if (err) console.log(err);
      res.render("details", { user });
    }
  );
});

app.post("/user/search", (req, res) => {
  const { id } = req.body;
  client.hgetall(id, (err, user) => {
    if (!user)
      return res.render("searchusers", { error: "User does not exist" });
    user.id = id;
    res.render("details", { user });
  });
});

app.delete("/user/delete/:id", (req, res) => {
  const { id } = req.params;
  client.del(id, (err, reply) => {
    if (err) console.log(err);
    res.redirect("/");
  });
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
