const apiKey = "19f84e11932abbc79e6d83f82d6d1045"
const URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=19f84e11932abbc79e6d83f82d6d1045&page=1"
const imgURL = "https://image.tmdb.org/t/p/w1280"
const searchURL =
    "https://api.themoviedb.org/3/search/movie?&api_key=19f84e11932abbc79e6d83f82d6d1045&query="
const form = document.getElementById("search-form")
const query = document.getElementById("query")
const root = document.getElementById("root")
let movies = [],
    page = 1,
    inSearchPage = false

async function fetchData(URL) {
    try {
        const data = await fetch(URL).then((res) => res.json())
        return data
    } catch (error) {
        console.log(error.message)
        return null
    }
}

const fetchAndShowResults = async (URL) => {
    const data = await fetchData(URL)
    data && showResults(data.results)
}

const getSpecificPage = (page) => {
    const URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=${page}`
    fetchAndShowResults(URL)
}

const movieCard = (movie) =>
    `<div class="col">
          <div class="card">
            <a class="card-media" href="">
              <img src="${movie.poster_path}" alt="PUBG Mobile" width="100%" />
            </a>
            <div class="card-content">
              <div class="card-cont-header">
                <div class="cont-left">
                  <h3 style="font-weight: 600">${movie.original_title}</h3>
                  <span style="color: #ff7ac6">${movie.release_date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>`

const showResults = (items) => {
    let content = !inSearchPage ? root.innerHTML : ""
    if (items && items.length > 0) {
        items.map((item) => {
            let { poster_path, original_title, release_date, overview } = item

            if (poster_path) {
                poster_path = imgURL + poster_path
            } else {
                poster_path = "./img-01.jpeg"
            }

            if (original_title.length > 15) {
                original_title = original_title.slice(0, 15) + "..."
            }

            if (!overview) {
                overview = "No overview yet..."
            }

            if (!release_date) {
                release_date = "No release date"
            }

            const movieItem = {
                poster_path,
                original_title,
                release_date,
                overview,
            }
            content += movieCard(movieItem)
        })
    } else {
        content += "<p>Something went wrong!</p>"
    }
    root.innerHTML = content 
}

const handleLoadMore = () => {
    getSpecificPage(++page)
}

const detectEndAndLoadMore = (e) => {
    let el = document.documentElement
    if (
        !inSearchPage &&
        el.scrollTop + el.clientHeight == el.scrollHeight
    ) {
        console.log("BINGO!")
        handleLoadMore()
    }
}

form.addEventListener("submit", async (e) => {
    inSearchPage = true
    e.preventDefault()
    const searchTerm = query.value
    searchTerm && fetchAndShowResults(searchURL + searchTerm)
    query.value = ""
})

window.addEventListener("scroll", detectEndAndLoadMore)

function init() {
    inSearchPage = false
    fetchAndShowResults(URL)
}


init();