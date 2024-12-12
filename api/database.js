var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{  
        db.run(`CREATE TABLE sights (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            image TEXT,
            lat REAL,
            lon REAL,
            type TEXT
            )`,
        (err) => {
            if (err) {
                console.log("CREATED SIGHTS")
                //table already created
            }
            else{
                //table just created, craeting rows
                var insert = `INSERT INTO sights (title, description, image, lat, lon, type) VALUES (?, ?, ?, ?, ?, ?)`
                db.run(insert, ["Λευκός Πύργος","Ο Λευκός Πύργος της Θεσσαλονίκης, είναι οχυρωματικό έργο οθωμανικής κατασκευής του 15ου αιώνα.","/webapp/images/img1.jpg",40.626365,22.948752,"landmark"])
                db.run(insert, ["ΑΓΑΛΜΑ ΜΕΓΑΛΟΥ ΑΛΕΞΑΝΔΡΟΥ","Στην παραλία της Θεσσαλονίκης, δίπλα στον Λευκό Πύργο βρίσκεται το άγαλμα του Μεγάλου Αλεξάνδρου, Βασιλέα των Μακεδόνων.","/webapp/images/img2.jpg",40.624028,22.950161,"landmark"])
                db.run(insert, ["ΚΗΠΟΙ ΤΟΥ ΠΑΣΑ","Μια άποψη που υπάρχει αναφέρει ότι οι κήποι ονομάστηκαν έτσι καθώς υπήρξαν το ησυχαστήριο του Οθωμανού μεράρχου Σεϊφουλάχ Πασά.","/webapp/images/img3.jpg",40.638229,22.959481,"landmark"])
                db.run(insert, ["ΑΨΙΔΑ ΤΟΥ ΓΑΛΕΡΙΟΥ","Χτίστηκε ως συγκρότημα ανακτόρων του Ρωμαίου αυτοκράτορα Γαλέριου κατά την περίοδο της Ρωμαϊκής «Τετραρχίας» (297-307 μ.Χ.)","/webapp/images/img4.jpg",40.632139,22.951866,"landmark"])
                db.run(insert, ["Ροτόντα","Η αρχική χρήση της δεν είναι γνωστή, αλλά διατυπώθηκαν ως τώρα διάφορες υποθέσεις: ότι υπήρξε ναός του Δία ή των Καβείρων.","/webapp/images/img5.jpg",40.633203,22.953148,"landmark"])
            }
        })
    }
});

module.exports = db