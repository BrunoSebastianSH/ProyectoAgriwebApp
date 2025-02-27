'use strict';
//apikey de opnewheatermap 
const apiKey = '634c44f6b412402884728a784d0b1191';
 
document.addEventListener("DOMContentLoaded", inicio);
//obtenemos a ubuicacion del usuario usando la geolocalizacion y el objeto navigator
export function obtenerUbicacionUsuario() {
    return new Promise((resolve, reject) => {
        //si acepta el permiso de obteneru ubicacion se muestran y se resuelven la latitud y longitud
        navigator.geolocation.getCurrentPosition(
            (success) => {
                const lat = success.coords.latitude;
                const lon = success.coords.longitude;
                console.log("Coordenadas del usuario APIWEATHERMAP: " + lat + " " + lon);
                resolve({ lat, lon });
            },
            (error) => {
                console.error("Error al obtener coordenadas", error);
                reject("Ocurrió un error al tratar de acceder a tus coordenadas");
            }
        ); 
    });
}
//obtencion de los datos del clima con openweathermap 
export async function obtenerDatosClima(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`);
    return await response.json();
}
//mostramos los datos en etiquetas html dentro de un div
function mostrarDatosClima(datos) {
    const resultadoElement = document.getElementById('resultado');
    if (resultadoElement) {
        resultadoElement.innerHTML = `
            <h2>Clima en ${datos.name}</h2>
            <p>Temperatura: ${datos.main.temp}°C</p>
            <p>Descripción: ${datos.weather[0].description}</p>
            <p>Humedad: ${datos.main.humidity} </p>
            <p>Precipitaciones ${datos.main.pressure}</p>
        `;
    }
}
//llamamos a la funcion obtenerubicacion, datos y mostrarlos en un try y catch
async function inicio() {
    try {
        const ubicacion = await obtenerUbicacionUsuario();
        const datosClima = await obtenerDatosClima(ubicacion.lat, ubicacion.lon);
        mostrarDatosClima(datosClima);
    } catch (error) {
        console.error(error);
        alert("Error: " + error);
    }
}
