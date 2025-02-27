
document.addEventListener("DOMContentLoaded", inicio);

let map;

// Función principal que inicia el proceso
function inicio() {
    obtenerUbicacionUsuario();
}

// Inicializa el mapa centrado en las coordenadas proporcionadas
export async function iniciarMapa(lat, lon) {
    map = L.map('map').setView([lat, lon], 16); // Zoom ajustado a 16 para mayor detalle
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Añade un marcador en la posición inicial
    L.marker([lat, lon]).addTo(map)
        .bindPopup('Tu ubicación actual')
        .openPopup();

    //parte 4. mostrar informacion sobre el mapa, tras obtener los datos del clima de la ubicacion se muestran todos en el mapa
    let datosClima = await obtenerDatosClima(lat,lon);
    const marcadorClima = L.marker([lat, lon]).addTo(map);
    marcadorClima.bindPopup(`
        <h3>Información del Clima</h3>
        <p>Temperatura: ${datosClima.main.temp}°C</p>
        <p>Humedad: ${datosClima.main.humidity}%</p>
        <p>Descripción: ${datosClima.weather[0].description}</p>
        <p>Viento: ${datosClima.wind.speed} m/s</p>
    `).openPopup();

}


// Obtiene la geolocalización del usuario y centra el mapa en su ubicación
export function obtenerUbicacionUsuario() {
        //metood del objeto geolocation para acceder a la ubicacion del dispositvio con el parametro de exito o error
        navigator.geolocation.getCurrentPosition(
            (success) => {
                const lat = success.coords.latitude;
                const lon = success.coords.longitude;
                console.log("cordenadas del usuario: " + lat + " " + lon)
                iniciarMapa(lat, lon);
               
            },
            (error) => {
                console.error("Error al obtener coordenadas", error);
                alert("ocurrio un error al tratar de acceder a tus cordenadas")
            }
        );
}
//obtenemos los datos del clima con openweathermap
async function obtenerDatosClima(lat, lon) {
    let apiKey = "634c44f6b412402884728a784d0b1191";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`);
    return await response.json();
}


