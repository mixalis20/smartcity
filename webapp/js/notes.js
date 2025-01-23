const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNotes(){
    // Αν υπάρχει αποθηκευμένο περιεχόμενο στο localStorage, το εμφανίζει
    notesContainer.innerHTML = localStorage.getItem("notes") || '';
}
showNotes();

function updateStorage() {
    // Ανανέωση του localStorage με το περιεχόμενο του notesContainer
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Δημιουργία νέου input box όταν πατηθεί το κουμπί
createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");

    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");

    // Εικόνα που θα προστεθεί στο inputBox
    img.src = "/webapp/images/delete.svg";  // Σιγουρέψου ότι η εικόνα υπάρχει ή χρησιμοποίησε έναν σωστό δρόμο
    
    // Προσθήκη της εικόνας στο inputBox
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);

    // Ανανέωση του localStorage με κάθε νέα σημείωση
    updateStorage();
});

// Διαχείριση click event για την αφαίρεση εικόνας
notesContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "IMG") {
        // Αφαίρεση του parent element του εικόνας (δηλαδή του p που την περιέχει)
        e.target.parentElement.remove();
        updateStorage();
    }
    // Όταν το κλικ γίνεται σε P στοιχείο (input box)
    else if (e.target.tagName === "P") {
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            // Όταν γίνεται αλλαγή στο περιεχόμενο, ανανεώνεται το localStorage
            nt.onkeyup = function() {
                updateStorage();
            }
        });
    }
});

// Διαχείριση Enter για προσθήκη γραμμής
document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();  // Αποφυγή του default behavior του Enter
    }
});
