// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")
var md5 = require("md5")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 8000
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({ "message": "Ok" })
});

//Sights
//get,post,put,delete
app.get("/api/sights", (req, res, next) => {
    var sql = "select * from sights"
    var params = []

    try {
        db.all(sql, params, (err, rows) => {
            if (err) {
                console.error(err.message)
                return res.status(500).json({ "error": "Internal server error" })
            } else {
                console.log(rows)
            }
            res.json(rows)
        });
    } catch (e) {
        res.status(404)
    }

})

app.get("/api/sights/:id", (req, res, next) => {
    var sql = "select * from sights where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        if (!row) {
            return res.status(404).json({ "error": "Could not find sight" })
        }

        return res.json({
            "message": "success",
            "data": row
        })
    });
})

app.post("/api/sights/", (req, res, next) => {
    if(!req.body){
        res.status(400)
    }
    var errors = []
    if (!req.body.type) {
        errors.push("No type specified");
    }
    if (!req.body.image) {
        errors.push("No image specified");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    var data = {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        lat: req.body.lat,
        lon: req.body.lon,
        type: req.body.type
    }
    var sql = 'INSERT INTO sights(title, description, image, lat, lon, type) VALUES (?, ?, ?, ?, ?, ?)'
    var params = [data.title, data.description, data.image, data.lat, data.lon, data.type]
    console.log(params)
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        if (!data.title) {
            return res.status(406).json({ "error": " Title required " })
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID,

        })
    });
})

app.put("/api/sights/:id", (req, res) => {
    const {id} = req.params;
    const {title, image} = req.body;
    if (!title || !image) {
        res.status(406).send("Title and image are required");
    } else {
        const sqlite = "UPDATE sights SET title = ?, image = ? WHERE id = ?";
        db.run(sqlite, [title, image, id], function(err) {
            if (err) {
                console.error(err.message)
                res.status(500).send("Internal Server error");
            } else if (this.changes === 0) {
                res.status(404).send("Sight not found");
            } else {
                res.status(200).send({id, title, image});
            }
        });
    }
})

app.delete("/api/sights/:id", (req, res, next) => {
    db.run(
        'DELETE FROM sights WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "Sight deleted", changes: this.changes })
        }); 
})


// Default response for any other request
app.use(function (req, res) {
    res.status(404);
});