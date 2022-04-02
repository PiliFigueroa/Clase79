const list = document.querySelector("#list")
const chargeButton = document.querySelector("#chargePokemon")
const nextButton = document.querySelector("#next")
const prevButton = document.querySelector("#prev")

let offset = 0

const getPokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=${offset}`)
        .then(response => response.json())
        .then(data => listPokemon(data.results))
        .catch(error => console.log(error))
        .finally(() => handleDisabledButton())
}

chargeButton.addEventListener("click", getPokemon)

// const showNames = (pokemons) => {
//     for (const pokemon of pokemons) {
//         console.log(pokemon.name)
//     }
// }

const listPokemon = (pokemons) => {
    list.innerHTML = ""
    for (const pokemon of pokemons) {
        list.innerHTML += `<li>${pokemon.name}</li>`
    }
}

const handleNext = () => {
    offset = offset + 100
    getPokemon()
}

const handlePrev = () => {
    if (offset > 0) {
        offset = offset - 100
        getPokemon()
    }
}

const handleDisabledButton = () => {
    chargeButton.style.display = "none"
    nextButton.style.display = "block"
    prevButton.style.display = "block"

    if (offset === 0) {
        prevButton.setAttribute("disabled", "disabled")
    } else {
        prevButton.removeAttribute("disabled", "disabled")
    }
}

nextButton.addEventListener("click", handleNext)
prevButton.addEventListener("click", handlePrev)