const container = document.getElementById("sights");

async function generateList() {
  const data = await fetch("./md.json").then((response) => response.json());
  const length = data.length;
  
  for(let i=0;i<length;i++){
    //create divs
    let el = document.createElement("div");
    el.innerText = data[i].title;
    container.appendChild(el)
    el.className = 'container'
    el.className = 'img-sights'
    
  }
}

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
