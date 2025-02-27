# AgriWebApp - Plataforma Inteligente de Agricultura Local - Bruno Sebastian Soto Herrera

## Descripción 

Esta aplicación web SPA tiene como objetivo proporcionar a agricultores una serie de herramientas útiles en la web. 
Integra funcionalidades de autenticación de usuarios, geolocalización, visualización de datos meteorológicos y análisis de imágenes.

## Funcionalidades Principales

*   **Autenticación de Usuarios:**
    *   Registro, inicio de sesión, regsitro, cierre de sesión y recuperación de contraseña.
    *   Implementado con Firebase.
    *   No contiene un dashboard
*   **Geolocalización:**
    *   Obtención de la ubicación geográfica del usuario.
    *   Visualización de la ubicación en un mapa interactivo con Leaflet.js.
*   **Información Meteorológica:**
    *   Integración con la API OpenWeatherMap para obtener datos del clima y pronósticos.
    *   Visualización de temperatura, humedad, precipitaciones y velocidad del viento.
*   **Información Gráfica en Mapa:**
    *   Visualización de información ambiental en el mapa
*   **Análisis Masivo de Datos:**
    *   Consulta y visualización de datos masivos de la API.
    *   Tablas interactivas con DataTables
*   **Captura y Analisis de Imágenes:**
    *   Captura de fotos desde el dispositivo (cámara frontal/trasera).
    *   Análisis de imágenes con TensorFlow.js

## Tecnologías Utilizadas

*   Lenguajes: HTML, CSS, JavaScript 
*   Librerías:
    *   Firebase Authentication
    *   Leaflet.js 
    *   OpenWeatherMap API
    *   DataTables.js 
    *   TensorFlow.js 
    *  Bootstrap

## Estructura 

La aplicación se organiza en los siguientes componentes/páginas principales:

*   **Inicio de Sesión / Registro:** Formulario de autenticación.
*   **Mapa Interactivo:** Muestra la ubicación del usuario e información adicional.
*   **Tablas Interactivas:** Listado y manipulación de datos masivos.
*   **Cámara y Análisis:** Componente para capturar y analizar imágenes.


## Funciones

*   Autenticación de usuarios con Firebase.
*   Geolocalización y visualización de mapas con Leaflet.js.
*   Consumo de APIs externas (OpenWeatherMap) y visualización de datos.
*   Análisis de imágenes en el navegador con TensorFlow.js.

