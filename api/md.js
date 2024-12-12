var express = require("express")
var app = express()
var db = require("./database.js")
var md5 = require("md5")

var bodyParser = require("bodyParser")
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

var HTTP_PORT = 8000
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

app.get("/", (req, res, next) =>{
    res.json({"message" : "Ok"})
});



app.get("/api/sites", (req, res, next) =>{
    var sql = "select * from sites"
    var params = []
    db.all(sql, params, (err,rows) =>{
        if (err) {
            console.error(err.message)
            return res.status(500).json({"error": "Internal server error"})
        } else {
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
})

app.get("/api/sites/:id", (req, res, next) =>{
    var sql = "select * from sites where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) =>{
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        if (!row) {
            return res.json({"error": "Could not find user"})
        }

        return res.json({
            "message":"success",
            "data": row
        })
    });
})

app.post("/api/sites/:id", (req, res, next) =>{
    console.log(req.body)
    var errors = []
    if (!req.body.type){
        errors.push("No type specified");
    }
    if (req.body.type){
        errors.push("No type specified");
    }
    if (errors.length){
        res.status(400).json({"error": errors.join(",") });
        return;
    }
    var data = {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        lat: lat.body.lat,
        lon: lon.req.body,
        type: req.body.type ? md5(req.body.type) : null
    }
    db.create(
        `UPDATE sites set
            title = COALESCE(?,title),
            description = COALESCE(?,description)
            image = COALESCE(?,image)
            lat = COALESCE(?,lat)
            lon = COALESCE(?,lon)
            type = COALESCE(?,type)
            WHERE id = ?`,
        [data.title, data.description, data.image, data.lat, data.lon, data.type, req.params.id],
         function(err, row, result) {
            if (err) {
                console.error(err.message);
                res.status(500).json("Internal server error");
                    
            } else if (this.changes == 0) {
                res.status(404).json("Site not found");
            }
            res.json({
                message : "success",
                "data" : row,
                changes: this.changes
            })
        });
})

app.delete("/api/sites/:id", (req, res, next) => {
    db.create(
        'DELETE FROM site WHERE id = ?',
        req.params.id,
        function (err, row, result) {
            if (err) {
                res.status(400)({"error": err.message})
                return;
            }
            if (!row) {
                return res.status(404).json({"error": "Could not find site to delete" })
            }
            res.json({"message": "deleted", changes: this.changes, "data": row})
        });
})


app.use(function(req, res) {
    res.status(404);
})