

const container = document.getElementById("sights");

async function generateList() {
  const data = await fetch("./md.json").then((response) => response.json());
  container.innerHTML = "";  // Καθαρίζουμε το container πριν προσθέσουμε τα νέα στοιχεία
  
  const length = data.length;
  
  for (let i = 0; i < length; i++) {
    // Δημιουργία του div για κάθε τοποθεσία
    let el = document.createElement("div");
    el.className = 'img-sights'; // Εφαρμογή της κλάσης για τα blocks

    // Δημιουργία του τίτλου και προσθήκη του στο div
    let title = document.createElement("h1");
    title.innerText = data[i].title; // Εισαγωγή τίτλου
    el.appendChild(title);
    

    // Δημιουργία της εικόνας και προσθήκη της στο div
    let image = document.createElement("img");
    image.src = data[i].image; // Η εικόνα φορτώνεται από το πεδίο 'image' του JSON
    image.alt = data[i].title; // Εναλλακτικό κείμενο για την εικόνα
    el.appendChild(image);

    // Προσθήκη του div στο container
    container.appendChild(el);

    // Προσθήκη listener για το κλικ
    el.addEventListener("click", function() {
      // Ανακατεύθυνση στη σελίδα με βάση το id της τοποθεσίας (π.χ., sights1.html, sights2.html)
      window.location.href = `sight${data[i].id}.html`;
    });
  }
}

// Κλήση της συνάρτησης για να δημιουργηθούν τα στοιχεία
generateList();











// if (container) {
//   for (let i = 0; i < 1; i++) {
//     let el = document.createElement("h1");
//     el.innerHTML = "1.ΛΕΥΚΟΣ ΠΥΡΓΟΣ";

//     container.appendChild(el);
//   }
// }

// const img = document.getElementById("sight2");

// if (img) {
//   for (let i = 0; i < 1; i++) {
//     let el = document.createElement("h1");
//     el.innerHTML = "2.ΑΓΑΛΜΑ ΜΕΓΑΛΟΥ ΑΛΕΞΑΝΔΡΟΥ";

//     img.appendChild(el);
//   }
// }

// const img1 = document.getElementById("sight3");

// if (img1) {
//   for (let i = 0; i < 1; i++) {
//     let el = document.createElement("h1");
//     el.innerHTML = "3.ΚΗΠΟΙ ΤΟΥ ΠΑΣΑ";

//     img1.appendChild(el);
//   }
// }
// const img2 = document.getElementById("sight4");

// if (img2) {
//   for (let i = 0; i < 1; i++) {
//     let el = document.createElement("h1");
//     el.innerHTML = "4.ΑΨΙΔΑ ΤΟΥ ΓΑΛΕΡΙΟΥ";

//     img2.appendChild(el);
//   }
// }

// const img3 = document.getElementById("sight5");

// if (img3) {
//   for (let i = 0; i < 1; i++) {
//     let el = document.createElement("h1");
//     el.innerHTML = "5.ΡΟΤΟΝΤΑ";

//     img3.appendChild(el);
//   }
// }

// let data =[]
//   for (let i = o; i <   )

// let el = document.createElement("div");
// let title = document.createElement("h1");
// title.innerText = "title";
// el.appendChild(title)
