const express = require("express");

const db = require(__dirname + "/../db_connect");
const fs = require("fs");
const multer = require('multer')
const upload = multer({dest:__dirname+'/image'})
const moment = require('moment-timezone');
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());
//get picture
// router.post("/upload", upload.array("imgage",12), (req, res) => {
//   const TempFile = req.files.upload
//   const TempPathFile = TempFile.path

//   const targetPathUrl = path.join(__dirname + "/image/" + TempFile.name)
  
//   if(path.extname(TempFile.originalFilename).toLowerCase() === ".png" || ".jpg"){
//     fs.rename(TempPathFile,targetPathUrl ,err => {
//       if(err) return console.log(err)
//     }) 
//   }

//   console.log(req.file);
// });


// get all article
router.get("/", (req, res) => {
  db.query("SELECT * FROM article").then(([results])=>{
    res.json(results)
  })
});

//get an article
router.get("/:id", async(req, res) => {
  const sql = "SELECT * FROM article WHERE id=?";

    const [results] = await db.query(sql, [req.params.id]);
    if(! results.length){
        return res.json('error');
    }
    res.json(results[0]);
});

router.post('/',upload.none(),async(req, res) => {
  console.log(req.body);
  if ( !req.body[0]) return
    const data = {
      title: req.body[0],
      image: req.body[1],
      outline: req.body[2],
      detial: JSON.stringify(req.body[3]),
    };
  const sql =
    "INSERT INTO `article` set ?";
   console.log("3");
  const [{ affectedRows, insertId }] = await db.query(sql, [data]);
    console.log("4");
  res.json({
    success: !!affectedRows,
    affectedRows,
    insertId,
  });
});


// router.get("/articles/:id", (req, res) => {
//   const article = article.find((c) => c.id === parseInt(req.params.id));
//   if (!article) res.status(404).send("The article is not found");
// });


// router.post("/add", upload.none(), async (req, res) => {
//   const data = { ...req.body };
//   data.created_at = new Date();
//   const sql = "INSERT INTO `article` set ?";
//   const [{ affectedRows, insertId }] = await db.query(sql, [data]);
//   res.json({
//     success: !!affectedRows,
//     affectedRows,
//     insertId,
//   });
// });

module.exports = router;