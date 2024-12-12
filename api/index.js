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

//push
key_val_sights = [
    {id: 1, title: "Λευκός Πύργος",description: "Ο Λευκός Πύργος της Θεσσαλονίκης, είναι οχυρωματικό έργο οθωμανικής κατασκευής του 15ου αιώνα.", image: "/webapp/images/img1.jpg", lat: 40.626365, lon: 22.948752, type: "landmark"  },
    {id: 2, title: "ΚΗΠΟΙ ΤΟΥ ΠΑΣΑ",description: "Στην παραλία της Θεσσαλονίκης, δίπλα στον Λευκό Πύργο βρίσκεται το άγαλμα του Μεγάλου Αλεξάνδρου, Βασιλέα των Μακεδόνων.",  image: "/webapp/images/img2.jpg", lat: 40.638229, lon: 22.959481, type: "landmark" },
    {id: 3, title: "ΑΓΑΛΜΑ ΜΕΓΑΛΟΥ ΑΛΕΞΑΝΔΡΟΥ",description: "Μια άποψη που υπάρχει αναφέρει ότι οι κήποι ονομάστηκαν έτσι καθώς υπήρξαν το ησυχαστήριο του Οθωμανού μεράρχου Σεϊφουλάχ Πασά.", image: "/webapp/images/img3.jpg", lat: 40.638229, lon: 22.959481, type: "landmark" },
    {id: 4, title: "ΑΨΙΔΑ ΤΟΥ ΓΑΛΕΡΙΟΥ",description: "Χτίστηκε ως συγκρότημα ανακτόρων του Ρωμαίου αυτοκράτορα Γαλέριου κατά την περίοδο της Ρωμαϊκής «Τετραρχίας»", image: "/webapp/images/img4.jpg", lat: 40.632139, lon: 22.951866, type: "landmark" },
    {id: 5, title: "Ροτόντα",description: "Η αρχική χρήση της δεν είναι γνωστή, αλλά διατυπώθηκαν ως τώρα διάφορες υποθέσεις: ότι υπήρξε ναός του Δία ή των Καβείρων.", image: "/webapp/images/img5.jpg", lat: 40.633203, lon: 22.953148, type: "landmark" }
];
  
key_val_sights.push({id: 6, title: "Φάρος της Αλεξανδρούπολης",description: "Η αρχική χρήση της δεν είναι γνωστή, αλλά διατυπώθηκαν ως τώρα διάφορες υποθέσεις: ότι υπήρξε ναός του Δία ή των Καβείρων.", image: "/webapp/images/img5.jpg", lat: 40.633203, lon: 22.953148, type: "landmark" });
  
console.log(key_val_sights);

// Default response for any other request
app.use(function (req, res) {
    res.status(404);
});