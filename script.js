document.addEventListener("DOMContentLoaded", function() {

const url_base = "http://api.openweathermap.org/data/2.5/"

const apiKey = "865654a47a420ab987ecf3de54b51afc"

const homeButton = document.querySelector('#homeButton')
const searchButton = document.querySelector('#searchButton')
const favoritesButton = document.querySelector('#favoritesButton')

const buttons = document.querySelectorAll("#nav>button")
const sections = document.querySelectorAll("#main>section")

// console.log(buttons)
// console.log(sections)


const homeSection = document.getElementById('homeSection')
// const searchSection = document.getElementById('searchSection')
// const favoritesSection = document.getElementById('favoritesSection')

// console.log('Home Section:', homeSection);
//     console.log('Search Section:', searchSection);
//     console.log('Favorites Section:', favoritesSection);

// const searchResults = document.querySelector('#searchResults')

const FavoriosListar = document.querySelector('#favoritesList')
const busquedaResultado = document.querySelector('#searchInput')
const mostsrarResultados = document.querySelector('#searchResults tbody')
const actualizarTiempo = document.querySelector('#updateFavoritesButton')

let favoritos = []
let jsonResultados

let home = []

// function hideAllSections() {
//     homeSection.style.display = 'none'
//     searchSection.style.display = 'none'
//     favoritesSection.style.display = 'none'
// }

function ocultarTodasSecciones() {
    sections.forEach(section => section.style.display = 'none');
}

// mostrar seccion home por defecto

ocultarTodasSecciones()
sections[0].style.display = "block"


for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {

        ocultarTodasSecciones()

        sections[i].style.display = "block"
    })
}


// homeButton.addEventListener('click', ()=> {
//     homeSection.style.display = 'block'
//     searchSection.style.display = 'none'
//     favoritesSection.style.display = 'none'
// })

// searchButton.addEventListener('click', ()=> {
//     homeSection.style.display = 'none'
//     searchSection.style.display = 'block'
//     favoritesSection.style.display = 'none'
// })

// favoritesButton.addEventListener('click', ()=> {
//     homeSection.style.display = 'none'
//     searchSection.style.display = 'none'
//     favoritesSection.style.display = 'block'
// })

busquedaResultado.addEventListener("keyup", function(ev){
    if (ev.key == "Enter"){
        const busqueda = busquedaResultado.value.trim()
        fetch(`${url_base}find?q=${busqueda}&units=metric&appid=${apiKey}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            jsonResultados = data
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
mostsrarResultados.addEventListener("click", function(ev) {
    if(ev.target.nodeName.toLowerCase()== "button"){
        let ciudadId = ev.target.dataset.id

        if (!favoritos.includes(ciudadId)) {
            favoritos.push(ciudadId)
            añadirSeccionFavoritos(ciudadId)
            // console.log(ciudadId)
        }

    }

})

    function añadirSeccionFavoritos(id) {
        // FavoriosListar.innerHTML = ""
        let ciudad = jsonResultados.list.find(r => r.id == id)
        if (ciudad) {
            const crearDiv = document.createElement('div')
            const botonBorrarFav = document.createElement('button')
            botonBorrarFav.textContent = "X"

            // crear boton para añadir a la seccion home

            const botonHome = document.createElement('button')
            botonHome.textContent = "Añadir a Home"
            botonHome.dataset.id = ciudad.id
            botonHome.classList.add('addHome')


            crearDiv.textContent = `${ciudad.name}, ${ciudad.sys.country}: ${ciudad.main.temp_min}°C , ${ciudad.main.temp_max}°C`
            FavoriosListar.append(crearDiv)
            crearDiv.append(botonBorrarFav)
            crearDiv.append(botonHome)
        }
    }

actualizarTiempo.addEventListener('click', function(){
    actualizarTiempoFavoritos()
})

function actualizarTiempoFavoritos() {
    FavoriosListar.innerHTML = ""; // Limpiar la lista actual antes de actualizar

    favoritos.forEach(favId => {
        fetch(`${url_base}weather?id=${favId}&units=metric&appid=${apiKey}`)
        .then(resp => resp.json())
        .then(data => {
            let crearDiv = document.createElement('div')
            let botonBorrarFav = document.createElement('button')
            botonBorrarFav.textContent = "X"
            botonBorrarFav.dataset.id = favId
            botonBorrarFav.classList.add('borrarFav')
            crearDiv.textContent = `${data.name}, ${data.sys.country}: ${data.main.temp_min}°C , ${data.main.temp_max}°C`
            crearDiv.append(botonBorrarFav)

            FavoriosListar.append(crearDiv)

            botonBorrarFav.addEventListener("click", function(ev) {
                let ciudadId = ev.target.dataset.id
                favoritos = favoritos.filter(favId => favId != ciudadId)
                ev.target.parentElement.remove()
                alert("Ciudad eliminada de favoritos")
            })
            
        })
        .catch(error => {
            console.error('Error al actualizar el clima de la ciudad:', error)
        })
    })
}

    // funcion para añadir a la seccion home
    function addHome(id) {
        let ciudad = jsonResultados.list.find(r => r.id == id)
        if (ciudad){
            const crearDivHome = document.createElement('div')
            crearDivHome.textContent = `${ciudad.name}, ${ciudad.sys.country}: ${ciudad.main.temp_min}°C , ${ciudad.main.temp_max}°C`
            homeSection.append(crearDivHome)

        }
    }

    //evento para añadir a la seccion home
    FavoriosListar.addEventListener("click", function(ev) {
        if(ev.target.nodeName.toLowerCase() == "button"){
            let ciudadId = ev.target.dataset.id
            if (!home.includes(ciudadId)) {
                home.push(ciudadId)
                addHome(ciudadId)
            }
        }
    })

    


})