const movieSearchResults = document.getElementsByClassName("movie-list")
const queryInput = document.getElementById("query")
const movieListElem = document.getElementById("movie-list")



document.getElementById("search-form").addEventListener("submit", search)


async function movieSearch(event){
    event.preventDefault()
    movieListElem.innerHTML = ``
    const options = {
        method: "GET"
    }

    const getResultArray = await fetch(`https://www.omdbapi.com/?s=${queryInput.value}&apikey=4b23ef2d`, options)
    .then(res => res.json())
    .then(data => {
        let resultArray = [] 
        for(let i = 0; i < data["Search"].length; i++){
            let secondQuery = data["Search"][i]['Title']
            resultArray.push(secondQuery)
        }
        return resultArray
    })
}

