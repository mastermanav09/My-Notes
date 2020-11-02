shownotes();

// add the note contents to local storage

let addbtn = document.getElementById("add_btn");
let footer = document.getElementById('footer')

addbtn.addEventListener("click", function (e) {
    let addtext = document.getElementById("AddTextarea1");
    let notes = localStorage.getItem("notes");

    if (addtext.value == "") {
        alert("Textarea is blank.");
    } else {
        if (notes == null) {
            notesobj = []; // Blank array
        } else {
            notesobj = JSON.parse(notes);
        }

        notesobj.push(addtext.value);
        localStorage.setItem("notes", JSON.stringify(notesobj));
        addtext.value = ""; //To blank the value written in the textbox (after adding it)
        shownotes();
    }
});

function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }

    let html = "";
    notesobj.forEach(function (element, index) {
        html += `
        <div class="card col-lg-3 m-3 notecard" style="width: 17rem;">
            <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text">${element}</p>
            <button id="${index}" onclick="deletenote(this.id)" class="btn btn-primary del_note">Delete note</button>
            </div>
      </div>`;
      
    });

    let noteselem = document.getElementById("notes");
    if (notesobj.length != 0) {

        noteselem.innerHTML = html;
        

    } else {
        noteselem.innerHTML = `<div id="add_notes__ind">Nothing to show! Use <a id="logo1" >'Add your note here'</a> section to add notes.</div>`;

        foot = document.getElementById('footer')
    }

}



// //To highlighten
// let logo = document.getElementById('logo1');
// let add_notecard = document.getElementById('notebox');

// logo.addEventListener('click', function () {
//     add_notecard.style = "box-shadow: 5px 5px 15px purple;"

//     logo.addEventListener('mouseleave', function () {
//         add_notecard.style = "box-shadow:none;"
//     })

// })



// function to delete a note
function deletenote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }

    let bool = confirm("Are you sure you want to delete this note ?");

    if (bool) {
        notesobj.splice(index, 1);
    }

    localStorage.setItem("notes", JSON.stringify(notesobj));
    shownotes();
}

let search = document.getElementById("search_txt");

search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();

    let notecards = document.getElementsByClassName("notecard");
    Array.from(notecards).forEach(function (element) {
        let cardtext = element.getElementsByTagName("p")[0].innerText;
        if (cardtext.toLowerCase().includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }

    });

});



/*
Further features coming soon
1) Add Title feature
2) Mark your note as important
3) delete all option
*/