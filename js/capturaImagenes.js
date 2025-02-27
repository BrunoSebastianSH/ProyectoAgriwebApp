'use strict'
// cuando se carga la página, arrancamos todo
document.addEventListener("DOMContentLoaded", inicio)

function inicio() {
    // guardamos todos los elementos a necesitar
    const video = document.getElementById('camera');
    const canvas = document.getElementById('snapshot');
    const result = document.getElementById('result');
    const captureButton = document.getElementById('capture');

    const fileInput = document.getElementById('fileInput');
    const insertButton = document.getElementById('insertButton');

    const ctx = canvas.getContext('2d');
    
    let streamCamara
    let posiCamara = 'environment' // por defecto usamos la cámara trasera

    // función para encender la cámara
    async function setupCamera() {
        // pedims permiso para usar la cámara
        streamCamara = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = streamCamara;
    }
    
    // función para cargar el modelo y hacer la predicción
    async function loadModelAndPredict(image) {
        result.textContent = 'cargando modelo...';
        // cargamos mobilenet
        const model = await mobilenet.load();
    
        // hacemos la predicción
        const predictions = await model.classify(image);
    
        // miramos si hay un perro en la imagen
        const isDog = predictions.some(pred => pred.className.toLowerCase().includes('dog'));
    
        // mostramos el resultado
        if (isDog) {
            result.textContent = '¡es un perro! 🐶';
        } else {
            result.textContent = 'no es un perro. 🚫';
        }
    }
    
    // cuando le damos al botón de capturar
    captureButton.addEventListener('click', () => {
        // ajustamos el tamaño del canvas al del video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    
        // dibujamos la imagen en el canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
        // analizamos la imagen
        loadModelAndPredict(canvas);
    });
    
    // comprobamos si estamos en un móvil
    let movil = {
        Android: function() {
            return navigator.userAgent.match(/Android/i) ? true : false;
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
        },
        any: function() {
            return (movil.Android() || movil.iOS());
        }
    };
    
    // si estamos en un móvil, añadimos el botón para cambiar de cámara
    if (movil.any()) {
        console.log("contenido para móvil");

        let cambiarCamara = document.createElement("button")
        cambiarCamara.textContent = "Cambiar cámara";

        cambiarCamara.classList.add("imgCamara")
        
        document.getElementById("buttonContainer").innerHTML += "<br>"
        document.getElementById("buttonContainer").appendChild(cambiarCamara)

        // cambiamos entre cámara trasera y frontal
        cambiarCamara.addEventListener("click", (e) => {
            if(streamCamara) {
                streamCamara.getTracks().forEach(track => track.stop())              
            }

            navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: { exact: `${posiCamara}`}
                }
            }).then(function(stream) {
                streamCamara = stream;
                video.srcObject = streamCamara;
            }).catch(function(error) {
                alert("error con la cámara: " + error);
            })

            // cambiamos la posición de la cámara
            if (posiCamara == 'environment')
                posiCamara = 'user'
            else
                posiCamara = 'environment'
        })
    }
    
    // para insertar una imagen desde el dispositivo
    insertButton.addEventListener("click", () => {
        fileInput.click();
    })

    // cuando seleccionamos una imagen
    fileInput.addEventListener("change", (e) => {
        if (fileInput.files[0].type.includes("image/")) {
            
            let file = fileInput.files[0]
            let reader = new FileReader()
            reader.onload = function(event) {
                let img = new Image()
                img.src = event.target.result
                img.onload = function() {
                    canvas.width = img.width
                    canvas.height = img.height
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                }
            }
            reader.readAsDataURL(file)
            loadModelAndPredict(canvas)

        } else {
            console.log("imagen inválida");
        }
    })

    // encendemos la cámara al cargar la página
    setupCamera();
}
