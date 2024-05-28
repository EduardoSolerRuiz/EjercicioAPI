//hacer la consulta a la api publica.

const dimeCiudad = document.querySelector("# ")  

const mostrarDatos = document.querySelector("#mostrarDatos")

const listaPais = document.querySelector("#pais")

const tabla = document.querySelector("#data-table")
const filaEncabezado = tabla.querySelector("thead tr")
let nombreEstadoClima = document.createElement("th")
nombreEstadoClima.textContent = "Estado Clima"

filaEncabezado.append(nombreEstadoClima)

let favoritos = []
let jsonResultados
let listaFavsUl = document.querySelector("#listaFavsUl")

dimeCiudad.addEventListener("keyup", function(ev){


    if (ev.key == "Enter") {
        let cadena = this.value.trim()

        console.log("Ciudad", cadena)
        fetch("http://api.openweathermap.org/data/2.5/find?q="+cadena+"&units=metric&apiKey=865654a47a420ab987ecf3de54b51afc")
        .then(resp => resp.json())
        .then(data => {
            jsonResultados = data
            mostrarCiudad(data)
        })
        .catch(error => {
            console.error('se produjo un error al obtener los datos: ', error)
        })
    }
})

function mostrarCiudad(datos){

    mostrarDatos.innerHTML = ""
    datos.list.forEach(r => {
        let nuevaFila = mostrarDatos.insertRow()
            let nuevaCelda1 = nuevaFila.insertCell()
            let nuevaCelda2 = nuevaFila.insertCell()
            let nuevaCelda3 = nuevaFila.insertCell()
            let nuevaCelda4 = nuevaFila.insertCell()
            let nuevaCelda5 = nuevaFila.insertCell()
            let nuevaCelda6 = nuevaFila.insertCell()
            let nuevaCelda7 = nuevaFila.insertCell()

            nuevaCelda1.textContent = r.name

            nuevaCelda2.textContent = `${r.main.temp} C°`

            nuevaCelda3.textContent = `${r.main.temp_min} C°`
            //console.log(nuevaCelda1, nuevaCelda2)

            nuevaCelda4.textContent = `${r.main.temp_max} C°`


            let iconoClima = document.createElement("img")
            iconoClima.src = `http://openweathermap.org/img/wn/${r.weather[0].icon}.png`
            nuevaCelda5.append(iconoClima)
            
            let botonFav = document.createElement("button")
            botonFav.textContent = "Añadir Fav"
            botonFav.dataset.id = r.id // el navegador le asigna el atributo data-id="45646545"

            nuevaCelda6.append(botonFav)
    })
}


mostrarDatos.addEventListener("click", function(ev) {
    if (ev.target.nodeName.toLowerCase() == "button") {
        //if (no está en favoritos incluirla)
        if (!favoritos.includes(ev.target.dataset.id)) {
            favoritos.push(ev.target.dataset.id)
            dibujarNuevoFavorito(ev.target.dataset.id)
        }
        
    }
})

function dibujarNuevoFavorito(id) {
    let nuevoLI = document.createElement("LI")

    let ciudad = jsonResultados.list.find( r => r.id == id)
    nuevoLI.textContent = ciudad.name + "(" + ciudad.sys.country + ")"
    nuevoLI.dataset.id = id

    let botonBorrarFav = document.createElement("button")
    botonBorrarFav.textContent = "X"
    botonBorrarFav.dataset.id = id
    botonBorrarFav.classList.add("borrarFav")

    nuevoLI.append(botonBorrarFav)

    listaFavsUl.append(nuevoLI)
}

function actualizarTiempoFavoritos() {
    //recorrer favoritos, y por cada ID, construir un LI dentro del UL
    favoritos.forEach( fav => {
        //consultar a la API, esta vez por ID, para consultar nueva INFO sobre esa ubicación
    })
}

listaFavsUl.addEventListener("click",function(ev) {
    if (ev.target.nodeName.toLowerCase() == "button") {
        if (ev.target.classList.contains("borrarFav")) {
            //borrar de favoritos este favorito con id almacenado en data-id
            favoritos = favoritos.filter( f => f !=  ev.target.dataset.id )
            ev.target.parentNode.remove()
            alert(favoritos)
        }
    }
})





