// type to get books
let searchTimeoutToken = 0;

window.onload = () => {
    const searchFieldElement = document.getElementById("input");
    searchFieldElement.onkeyup = (event) => {

        //use of setTimeout()

        clearTimeout(searchTimeoutToken);

        if (searchFieldElement.value.trim().length === 0) {
            return; //early exit //use of trim()
        }

        searchTimeoutToken = setTimeout(() => {
            getBooks(searchFieldElement.value);
        }, 300);
    };
}

//get books function

function getBooks(query){
    displayLoading();
    let results = document.getElementById("results");
    results.innerText = "";
    fetch(`https://openlibrary.org/search.json?q=${query}`)
        .then(response => response.json())
        .then((data) => {
            hideLoading();
            for (let i = 0; i < 15; i++){
                results.innerHTML +=             
                `
                <h3>${data.docs[i].title}</h3>
                <p>${data.docs[i]["author_name"]}</p>
                <hr> 
                `
            };
            document.getElementById("errorMessage").innerHTML = ""; //remove the error
        })
        .catch((error) => {
          document.getElementById("errorMessage").innerHTML = `<h3>Try different keywords.</h3>`; //display the error
          results.innerHTML = ""; //display nothing
      });
}

// loading feature

const loader = document.getElementById("loading");

function displayLoading(){
  loader.classList.add("display");
  setTimeout(()=>{
    loader.classList.remove("display");
  }, 13000);
}

function hideLoading(){
  loader.classList.remove("display");
}
