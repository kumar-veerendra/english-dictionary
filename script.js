const inputEle = document.getElementById("input");
const infoEle = document.getElementById("info-text");
const meaningContainerEle = document.getElementById("meaning-container");
const titleEle = document.getElementById("title");
const meaningEle = document.getElementById("meaning");
const audioEle = document.getElementById("audio");

async function fetchAPI(word){
    try {
        infoEle.style.display = "block";
        meaningContainerEle.style.display = "none";
        infoEle.innerText = `Searching the meaning of "${word}"`;
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url).then((res) => res.json());
        // console.log(result);
        if(result.title){
            meaningContainerEle.style.display = "block";
            infoEle.style.display = "none";
            titleEle.innerText = word;
            meaningEle.innerText = "N/A";
            audioEle.style.display = "none";
        }
        else{
            infoEle.style.display = "none";
            meaningContainerEle.style.display = "block";
            audioEle.style.display = "inline-flex";
            titleEle.innerText = result[0].word;
            meaningEle.innerText = result[0].meanings[0].definitions[0].definition;
            audioEle.src = result[0].phonetics[0].audio;
        }
        
    } catch (error) {
        console.log(error);
        infoEle.innerText = `An error happened , Try again later !!`;
    }
    

}

const buttonEle = document.querySelector(".button");

buttonEle.addEventListener("click", () => {
    const word = inputEle.value.trim();
    if(word){
        fetchAPI(word);
    }
});

inputEle.addEventListener("keyup", (e) =>{
    // console.log(e.target.value);
    if(e.target.value && e.key === "Enter"){
        fetchAPI(e.target.value);
    }
});