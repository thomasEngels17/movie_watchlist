let personal_movie_list = document.getElementById("personal-movie-list")
const movieSearchResults = document.getElementsByClassName("movie-list")
const queryInput = document.getElementById("query")
const movieListElem = document.getElementById("movie-list")
const arrayOfMovieDetails = []
let movie_index = 0

//Ensures we always have the correct movie_index
if(localStorage.getItem(`localStorageMovieLength`) !== null){
    movie_index = JSON.parse(localStorage.getItem('localStorageMovieLength'))
}

/**
* Function that stores the selected movie to local storage to ultimately be added to the watchlist
* @author   Tommy Engels
* @param    {movie_id} movie_id each button is unique and linked to unique movie
* @return   {None} returns nothing
*/
function addToWatchList(movie_id){
    console.log("Clicked")
    let movie_for_list = document.getElementById(`add-to-watchlist-btn ${movie_id}`).parentElement.parentElement.parentElement
    console.log(movie_for_list)
    localStorage.setItem(`${movie_index}`, movie_for_list.innerHTML)
    movie_index += 1
    let updated_length = JSON.parse(localStorage.getItem('localStorageMovieLength')) +  1
    localStorage.setItem('localStorageMovieLength', `${updated_length}`)
}

/**
* Function that accesses local storage using the movie_index keys and renders the movies on the watchlist
* @author   Tommy
* @param    
* @return   returns nothing
*/
function renderWatchList(){
    let loop_length = JSON.parse(localStorage.getItem('localStorageMovieLength'))
    let i = 0
    while(i <loop_length){
        console.log("entering for loop")
        let movie = window.localStorage.getItem(`${i}`)
        console.log(movie)
        personal_movie_list.innerHTML += `
        <div class="movie">
        ${movie}
        </div>`
        i += 1
    }
}

if (document.getElementById("search-form")){
    document.getElementById("search-form").addEventListener("submit", async function(event){
        movieListElem.innerHTML = ``
        event.preventDefault()
        console.log(queryInput.value)

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

        const getResultArrayPosters = await fetch(`https://www.omdbapi.com/?s=${queryInput.value}&apikey=4b23ef2d`, options)
        .then(res => res.json())
        .then(data => {
            let resultArray = [] 
            for(let i = 0; i < data["Search"].length; i++){
                let secondQuery = data["Search"][i]['Poster']
                resultArray.push(secondQuery)
            }
            return resultArray
        })

        for(let i = 0; i < getResultArray.length; i++){
            let movie_title = ''
            const getMovieDetails = await fetch(`https://www.omdbapi.com/?t=${getResultArray[i]}&apikey=4b23ef2d`, options)
            .then(res => res.json())
            .then(data => {
                    console.log("second api call data")
                    console.log(data)
                    movie_title = data['Title']
                    movieListElem.innerHTML += 
                    `
                    <div class="movie">
                        <div class="movie-image">
                            <img src="${getResultArrayPosters[i]}" alt="Movie" width="99px" height="147.41px">
                        </div>
                        <div class="movie-description">
                                <div id="high-level">
                                    <h4 id="movie-title">${data['Title']}</h4>
                                    <h6 id="rating"> ${data['imdbRating']} rating</h6>
                                </div>
                                <div id="movie-logistics">
                                    <p id="length"> ${data['Runtime']} </p>
                                    <p id="category"> ${data['Genre']}</p>
                                    <button id="add-to-watchlist-btn ${i}" onclick="addToWatchList(${i})"> Add to Watchlist </button>
                                </div>
                                <div id="plot">
                                    <p> ${data['Plot']}</p>
                                </div>
                        </div>
                    </div>
                    `
                })
        }
    })
}

/**
* Function that clears localStorage, reloads the application, therefore giving the user an empty watchlist
* @author   Tommy
* @param    
* @return   
*/
function clearWatchList(){
    localStorage.clear()
    location.reload()
}




