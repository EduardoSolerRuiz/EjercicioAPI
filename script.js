const url_base = "http://api.openweathermap.org/data/2.5/"

const apiKey = "865654a47a420ab987ecf3de54b51afc"

const homeButton = document.querySelector('#homeButton')
const searchButton = document.querySelector('#searchButton')
const favoritesButton = document.querySelector('#favoritesButton')


const homeSection = document.getElementById('homeSection')
const searchSection = document.getElementById('searchSection')
const favoritesSection = document.getElementById('favoritesSection')

// const searchResults = document.querySelector('#searchResults')
const FavoriosListar = document.querySelector('#favoritesList')
const busquedaResultado = document.querySelector('#searchInput')
const mostsrarResultados = document.querySelector('#searchResults tbody')


homeButton.addEventListener('click', ()=> {
    homeSection.style.display = 'block'
    searchSection.style.display = 'none'
    favoritesSection.style.display = 'none'
})

searchButton.addEventListener('click', ()=> {
    homeSection.style.display = 'none'
    searchSection.style.display = 'block'
    favoritesSection.style.display = 'none'
})

favoritesButton.addEventListener('click', ()=> {
    homeSection.style.display = 'none'
    searchSection.style.display = 'none'
    favoritesSection.style.display = 'block'
})

busquedaResultado.addEventListener("keyup", function(ev){
    if (ev.key == "Enter"){
        const busqueda = busquedaResultado.value.trim()
        fetch(`${url_base}find?q=${busqueda}&units=metric&appid=${apiKey}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            mostrarCiudad(data)
        })
        .catch(error => {
            console.error('se produjo un error al obtener los datos: ', error)
        })
    }
})

function mostrarCiudad(datos){

    mostsrarResultados.innerHTML = ""
    datos.list.forEach(r => {

        let nuevaFila = mostsrarResultados.insertRow()
            let nuevaCelda1 = nuevaFila.insertCell()
            let nuevaCelda2 = nuevaFila.insertCell()
            let nuevaCelda3 = nuevaFila.insertCell()
            let nuevaCelda4 = nuevaFila.insertCell()
            let nuevaCelda5 = nuevaFila.insertCell()

        nuevaCelda1.textContent = r.name

        nuevaCelda2.textContent = r.sys.country

        nuevaCelda3.textContent = `${r.main.temp_min}°C`
        nuevaCelda4.textContent = `${r.main.temp_max}°C`


        let botonFav = document.createElement("button")
        botonFav.textContent = "Añadir Fav"

        botonFav.dataset.id = r.id

        nuevaCelda5.append(botonFav)
        
    })

}

mostsrarResultados.addEventListener("click", function(ev){

    if (ev.target.nodeName == "button"){
        if(!FavoriosListar.includes(ev.target.dataset.ed)){
            FavoriosListar.push(ev.target.dataset.id)
        }
    }

})









