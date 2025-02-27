'use strict';

// cuando la pagina se carga, arrancamos todo
document.addEventListener("DOMContentLoaded", inicio);

// funcion principal que se ejecuta al inicio
async function inicio() {
    try {
        // inicializamos la tabla
        await inicializarTabla();
    } catch (error) {
        // si hay error lo mostramos en la consola
        console.error("error:", error);
    }
}

// lista de ciudades con sus coordenadas
const ubicaciones = [
    { nombre: "nueva york", lat: 40.7128, lon: -74.0060 },
    { nombre: "londres", lat: 51.5074, lon: -0.1278 },
    { nombre: "tokio", lat: 35.6762, lon: 139.6503 },
    { nombre: "parís", lat: 48.8566, lon: 2.3522 },
    { nombre: "sídney", lat: -33.8688, lon: 151.2093 },
    { nombre: "río de janeiro", lat: -22.9068, lon: -43.1729 },
    { nombre: "ciudad del cabo", lat: -33.9249, lon: 18.4241 },
    { nombre: "moscú", lat: 55.7558, lon: 37.6173 },
    { nombre: "dubai", lat: 25.2048, lon: 55.2708 },
    { nombre: "mumbai", lat: 19.0760, lon: 72.8777 }
];

// función para obtener el clima de una ubicacion
async function obtenerDatosClima(ubicacion) {
    // clave de la api de openweathermap
    const apiKey = "634c44f6b412402884728a784d0b1191";
    // hacemos la petición a la api
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${ubicacion.lat}&lon=${ubicacion.lon}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    // guardamos la temperatura y descripcion en el objeto ubicacion
    ubicacion.temperatura = data.main.temp;
    ubicacion.descripcion = data.weather[0].description;
    return ubicacion;
}

// función para inicializar la tabla con los datos del clima
async function inicializarTabla() {
    // obtenemos los datos del clima para cada ubicación junto a su temperatura y descripcion
    for (let ubicacion of ubicaciones) {
        await obtenerDatosClima(ubicacion);
    }

    // creamos la tabla con datatables mediante jquery y con los datos del array ubicaciones
    $('#tabla').DataTable({
        data: ubicaciones,
        columns: [
            { title: "ciudad", data: "nombre" },
            { title: "latitud", data: "lat" },
            { title: "longitud", data: "lon" },
            { title: "temperatura", data: "temperatura" },
            { title: "descripción", data: "descripcion" }
        ],
        paging: true,
        searching: true,
        info: true,
        //intentamos añadir botones a la tabla
        dom: 'Bfrtip',
        buttons: [
            "copy", 'csv', 'excel'
        ]
    });
}
