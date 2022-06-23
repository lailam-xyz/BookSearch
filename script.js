let input = document.getElementById("input");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getBooks();
  }
});


function getBooks(){
    let query = document.getElementById("input").value;
    let results = document.getElementById("results");
    results.innerText = "";
    fetch(`https://openlibrary.org/search.json?q=${query}`)
        .then(response => response.json())
        .then((data) => {
            for (let i = 0; i < 6; i++){
                results.innerHTML +=             
                `
                <h3>${data.docs[i].title}</h3>
                <p>${data.docs[i]["author_name"]}</p>
                <img src="https://covers.openlibrary.org/b/isbn/${data.docs[i].isbn[0]}-M.jpg">
                <hr> 
                `
            }
        })
}

