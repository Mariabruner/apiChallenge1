let baseURL = "https://pokeapi.co/api/v2"


let button = document.getElementById('submit-button')

//randomly order pokemon
let pokemonIndex = Array.from({ length: 150 }, (_, i) => i + 1)

function shuffle(arr) {
    let i = arr.length - 1
    for (arr.length - 1; i > 0; i--) {
        randIndex = Math.floor(Math.random() * i)

        let tempVal = arr[i]
        arr[i] = arr[randIndex]
        arr[randIndex] = tempVal
    }
    return arr
}

ranPokemonIndex = shuffle(pokemonIndex)
console.log(ranPokemonIndex)

//initialize variables
let index = 1
let correctCounter = 0
let totalCounter = 0

//functions
const getAPokemon = (index) => {
  let data = fetch(baseURL + `/pokemon/${ranPokemonIndex[index-1]}/`)
    .then(res => res.json())
    .then(json => {

        let curPokemon = {
            name: json.name,
            abilities: json.abilities,
            moves: json.moves,
            types: json.types,
            id: json.id,
        }
        showPokemon(curPokemon.id)
        return curPokemon
    })
    return data
}

const showPokemon = (pokemonId) => {
    setTimeout(() => {
    document.getElementById("answer-holder").innerHTML = ""
    document.getElementById("hint-holder").innerHTML = ""

    let picture = document.createElement('img')
        picture.style.width = "600%"
        picture.style.height = "auto"
        picture.style.filter = "brightness(0%)"
        picture.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
        document.getElementById("pokemon-picture").innerHTML = ""
        document.getElementById("pokemon-picture").appendChild(picture) 
        }, 2000)
}

const revealPokemon = (pokemon, pointer) => {
    document.getElementById("score").innerHTML = `Score: ${correctCounter} / ${totalCounter}`
    let picture = document.createElement('img')
    picture.style.width = "600%"
    picture.style.height = "auto"
    picture.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
    document.getElementById("pokemon-picture").innerHTML = ""
    document.getElementById("pokemon-picture").appendChild(picture)
    index++

    if (pointer == "correct"){
        document.getElementById("answer-holder").innerHTML=`Correct! It's ${pokemon.name}!`
    } else if (pointer == "wrong") {
        console.log("wrong")
        document.getElementById("answer-holder").innerHTML= `Nope! It's ${pokemon.name}!`
    }

    nextPokemon(index)
}

const compareAnswer = (curPokemon) => {
    guess = document.getElementById("guessValue").value 
    
    if(curPokemon.name == guess.toLowerCase()) {
        correctCounter++
        totalCounter++
        revealPokemon(curPokemon, "correct")
    } else if (guess.toLowerCase !== curPokemon.name) {
        totalCounter++
        revealPokemon(curPokemon, "wrong")
    }
}

const showHint = (curPokemon) => {
    hint = document.getElementById("hint-holder")

    let selector = Math.floor(Math.random() * (3)) //pick random number between 0 and 2

    if (selector == 0){
    hint.innerHTML = `This Pokemon is a "${curPokemon.types[0].type.name}" type`
    } else if (selector == 1) {
        hint.innerHTML = `This Pokemon has the ability "${curPokemon.abilities[0].ability.name}"`
    } else if (selector == 2) {
        hint.innerHTML = `This Pokemon has the move "${curPokemon.moves[0].move.name}"`
    }
}

//get data from promise
const printPokemon = async () => {
   const pokemon = await getAPokemon(index)
    console.log(pokemon)
    document.getElementById("submit-button").addEventListener("click", () => compareAnswer(pokemon), {once: true})
    document.getElementById("hint-button").addEventListener("click", () => showHint(pokemon), {once: true})
    return pokemon
}


const nextPokemon = (index) => {
    curPokemon = printPokemon(index)
}

//for first pokemon
if (index == 1) {
    curPokemon = printPokemon(index)
}



