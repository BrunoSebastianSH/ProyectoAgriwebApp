`use strict`
// importamos las funciones necesarias de firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// configuracoón de firebase
const firebaseConfig = {
    apiKey: "AIzaSyDrY43w_VZiX2TWPl4m9qZaTPTj19E3_Q4",
    authDomain: "agriwebap.firebaseapp.com",
    projectId: "agriwebap",
    storageBucket: "agriwebap.firebasestorage.app",
    messagingSenderId: "502470196147",
    appId: "1:502470196147:web:f3cf1a50513d396af6e9c6",
    measurementId: "G-B6CXVJEWRB"
};

// cuando el html se carga, ejecuta la función inicio
document.addEventListener("DOMContentLoaded", inicio);

// variable global para la autenticación
let auth;

// función inicio
function inicio() {
    // inicializamos firebase con la configuración que tenemos
    const app = initializeApp(firebaseConfig);
    // obtenemos la instancia de autenticación de firebase y la guardamos en la variable global
    window.auth = getAuth(app); 
    auth = window.auth; 

    // llamamos a las funciones para crear el formulario y los botones
    crearFormulario();
    botonesFunciones();
}

// función para crear el formulario de autenticación dinámicamente
function crearFormulario() {
    // obtenemos el elemento div donde vamos a insertar el formulario
    let divFormulario = document.getElementById("autenticacion");
    // creamos el elemento formulario
    let form = document.createElement("form");
    form.id = "formularioAutenticacion";
    let br = document.createElement("br");

    // creamos los elementos del formulario para el correo
    let labelCorreo = document.createElement("label");
    labelCorreo.textContent = "Correo Electronico";
    let inputCorreo = document.createElement("input");
    inputCorreo.type = "email";
    inputCorreo.name = "correo";
    inputCorreo.id = "correo";
    inputCorreo.required = true;

    // creamos los elementos del formulario para la contraseña
    let labelContrasena = document.createElement("label");
    labelContrasena.textContent = "Contraseña";
    let inputContrasena = document.createElement("input");
    inputContrasena.type = "password";
    inputContrasena.name = "contrasena";
    inputContrasena.id = "contrasena";
    inputContrasena.required = true;

    // creamos los botones del formulario
    let botonSesion = document.createElement("button");
    botonSesion.type = "submit";
    botonSesion.id = "botonSesion";
    botonSesion.textContent = "Iniciar Sesion";

    let botonRegistro = document.createElement("button");
    botonRegistro.type = "button";
    botonRegistro.id = "botonRegistro";
    botonRegistro.textContent = "Registrarse";

    let botonRecuperar = document.createElement("button");
    botonRecuperar.type = "button";
    botonRecuperar.id = "botonRecuperar";
    botonRecuperar.textContent = "Recuperar contraseña";

    let botonCerrar = document.createElement("button");
    botonCerrar.type = "button";
    botonCerrar.id = "botonCerrar";
    botonCerrar.textContent = "Cerrar sesion";

    // agregamos los elementos al formulario
    form.append( 
        labelCorreo, br, inputCorreo, br,
        labelContrasena, br, inputContrasena, br,
        botonSesion, botonRegistro, botonRecuperar, botonCerrar
    );
    // agregamos el formulario al div
    divFormulario.appendChild(form)

}

// función para agregar las funciones a los botones
function botonesFunciones() {
    // obtenemos los elementos de los botones
    let formularioInicioSesion = document.getElementById('botonSesion');
    let botonRegistro = document.getElementById('botonRegistro');
    let botonRecuperarContraseña = document.getElementById('botonRecuperar');
    let botonCerrarsesion = document.getElementById("botonCerrar")

    // agregamos la función para iniciar sesión al botón
    formularioInicioSesion.addEventListener('click', async (e) => {
        //con preventdefault hace que no se recargue la página al enviar el formulario
        e.preventDefault();
        let correo = document.getElementById('correo').value; // obtenemos el correo del formulario
        let contrasena = document.getElementById('contrasena').value; // obtenemos la contraseña del formulario


        // intentamos autenticar al usuario con correo y contraseña usando firebase usando try y catch para capturar errores
        try {
            const userCredential = await signInWithEmailAndPassword(auth, correo, contrasena);
            console.log('usuario:', userCredential.user.email); // mostramos el correo del usuario en la consola
            alert("usuario logeado");
            } catch (error) {
            console.log("error al iniciar sesion", error);
            alert("error al iniciar sesión"); // mostramos un mensaje de error más descriptivo
        }
    });

    // agregamos la función para registrar al usuario al botón
    botonRegistro.addEventListener('click', async (e) => { // agregamos la funcionalidad al botón de registro
        e.preventDefault();
        let correo = document.getElementById('correo').value; // obtenemos el correo del formulario
        let contrasena = document.getElementById('contrasena').value; // obtenemos la contraseña del formulario
        //usamos try y catch con el metodo firebase para registrar y mostramos si se crea
        try { 
            const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
            console.log('usuario registrado:', userCredential.user.email);
            alert("usuario registrado exitosamente.");
        } catch (error) {
            console.error("error al registrar:", error);
            alert("error al registrarse");
        }
    });

    // agregamos la función para recuperar la contraseña al botón
    botonRecuperarContraseña.addEventListener('click', async () => {
        const correo = document.getElementById('correo').value; // obtenemos el correo
        
        // comprobamos si el correo está vacío
        if (correo == "") {
            alert('por favor, ingresa tu correo para recuperar la contraseña.')
            return;
        }

        try {
            // enviamos un correo de recuperación de contraseña a la dirección proporcionada
            await sendPasswordResetEmail(auth, correo);
             alert('correo de recuperación enviado');
        } catch (error) {
            alert('error al enviar correo de recuperación');
            console.error(error);
        }
    });

    // agregamos la función para cerrar sesión al botón
    botonCerrarsesion.addEventListener('click', async () => {
        try {
            await auth.signOut();
            alert('sesión cerrada correctamente.');
        } catch (error) {
            console.error('error al cerrar sesión:', error);
            alert('error al cerrar sesión: ' + error.message);
        }
    });
}
