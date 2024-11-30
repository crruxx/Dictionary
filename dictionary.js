
const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
let btn = document.querySelector("#search-btn");
let myrow = document.querySelector("#showans");
let sound = document.querySelector("#sound");
let change_img = document.querySelector(".newimg");
let voiceBtn = document.querySelector(".voice");
let inputField = document.querySelector("#myword");

async function performSearch() {
    let word = inputField.value;

    await fetch(`${url}${word}`)
        .then((response) => response.json())
        .then((data) => {
            let meanings1 = data[0].meanings[0].partOfSpeech;
            let meanings2 = data[0].phonetic;
            let main_meanings = data[0].meanings[0].definitions[0].definition;
            let example = data[0].meanings[0].definitions[0].example;
            let sound1 = data[0].phonetics[0].audio;

            myrow.innerHTML = `
            <div class="word">
            <h3>${word}</h3>
            <button onclick="playSound()" class="voice" id="voiceBtn">
            <i class="fas fa-volume-up"></i>
            </button>
            </div>
            <div class="details">
            <p>${meanings1}</p>
            <p>${meanings2}</p>
            </div>
            <p class="word-meaning">${main_meanings}</p>
            <p class="word-example">${example}</p>`;
            sound.setAttribute("src", `${sound1}`);
            change_img.src = "Assets/Dictionary.png";
        })
        .catch(() => {
            if (word === "") {
                myrow.innerHTML = `<h4>Please Enter the word !</h4>`;
            } else {
                change_img.src = "Assets/Dictionary-not-found.png";
                myrow.innerHTML = `<h3 class="word-error">Couldn't Find The Word</h3>`;
            }
        });
}

// Event listener for the search button
btn.addEventListener("click", performSearch);

// Event listener for Enter key
inputField.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission if within a form
        performSearch();
    }
});

function playSound() {
    sound.play();
  
    document.getElementById('voiceBtn').classList.add('voiceAn');
  
    setTimeout(() => {
      document.getElementById('voiceBtn').classList.remove('voiceAn');
    }, 500);
  }      


          