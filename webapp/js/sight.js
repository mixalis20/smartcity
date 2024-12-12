const container = document.getElementById("sight-info");

async function generateList() {
  const data = await fetch("/webapp/json/md.json").then((response) => response.json());
  container.innerHTML = "";  // Καθαρίζουμε το container πριν προσθέσουμε τα νέα στοιχεία
  
  const length = data.length;

  const urlParams = new URLSearchParams(window.location.search);
    const sightId = urlParams.get('sightId');
    
  


  let currentSite = null

  for(let i = 0;i<length;i++){
    if(data[i].id === parseInt(sightId)){
        currentSite = data[i];
        break;
    }
  }

  if(currentSite){
    let el = document.createElement("div");
    el.className = 'sights'; // Εφαρμογή της κλάσης για τα blocks

    // Δημιουργία του τίτλου και προσθήκη του στο div
    let title = document.createElement("h1");
    title.innerText = currentSite.title; // Εισαγωγή τίτλου
    el.appendChild(title);

    // Δημιουργία της εικόνας και προσθήκη της στο div
    let image = document.createElement("img");
    image.src = currentSite.image; // Η εικόνα φορτώνεται από το πεδίο 'image' του JSON
    image.alt = currentSite.title; // Εναλλακτικό κείμενο για την εικόνα
    el.appendChild(image);


    // Προσθήκη του div στο container
    container.appendChild(el);
    
    
    let description = document.createElement ("description");
    description.innerText = currentSite.description;
    el.appendChild(description);

  }
}
// Κλήση της συνάρτησης για να δημιουργηθούν τα στοιχεία
generateList();