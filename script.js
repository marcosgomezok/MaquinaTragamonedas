var fichas = 20;
var fichasPerdidas = 0;
var fichasGanadas = 0;
const carga = document.getElementById("carga");
const tusfichas = document.getElementById("tus-fichas-info");
const tusganadas = document.getElementById("tus-ganadas-info");
const tusperdidas = document.getElementById("tus-perdidas-info");
tusfichas.innerHTML = fichas
tusperdidas.innerHTML = fichasPerdidas
tusganadas.innerHTML = fichasGanadas
var duracionGiro = 300;
const elementos = document.querySelectorAll(".slot img");
const palanca = document.getElementById("palanca");
var r=0
 var flagSonido = false;
 const sonido = document.querySelector("#icono-sonido");
 sonido.addEventListener("click", sonidoOffOn);

 const simulacion = document.getElementById("simulacion");
 simulacion.addEventListener("click", simulate);
 
 function vertragamonedas() {
    document.getElementById("contenedorslot").hidden = false
    document.getElementById("contenedorsimu").hidden = true
}
 function versimulador() {
    document.getElementById("contenedorslot").hidden = true
    document.getElementById("contenedorsimu").hidden = false
}

palanca.addEventListener("click", giro);

function obtenerAleatorios() {
    var numeroAleatorio = Math.floor(Math.random() * 10);
    var rutaImagen = `./tm-img/${numeroAleatorio}.png`;
    return rutaImagen;
}

function obtenerValores() {
    //var random = Math.random();
    var random = array[r];
    r++;
    if(r==10000){r=0}
    fichasPerdidas++;
    fichas--;
    if(random<=0.01){
        var rutaImagen = [`./tm-img/6.png`,`./tm-img/6.png`,`./tm-img/6.png`];
        fichas+=20;
        fichasGanadas+=20;
        return rutaImagen;
    }
    if(random<=0.03){
        var rutaImagen = [`./tm-img/2.png`,`./tm-img/2.png`,`./tm-img/2.png`];
        fichas+=10;
        fichasGanadas+=10;
        return rutaImagen;
    }
    if(random<=0.06){
        var rutaImagen = [`./tm-img/5.png`,`./tm-img/5.png`,`./tm-img/5.png`];
        fichas+=6;
        fichasGanadas+=6;
        return rutaImagen;
    }
    if(random<=0.11){
        var rutaImagen = [`./tm-img/4.png`,`./tm-img/4.png`,`./tm-img/4.png`];
        fichas+=4;
        fichasGanadas+=4;
        return rutaImagen;
    }
    if(random<=0.19){
        var rutaImagen = [`./tm-img/1.png`,`./tm-img/1.png`,`./tm-img/1.png`];
        fichas+=2;
        fichasGanadas+=2;
        return rutaImagen;
    }
    if(random<=1){
        var rutas = [Math.floor(Math.random() * 10),Math.floor(Math.random() * 10),Math.floor(Math.random() * 10)]
        while(rutas[0]==rutas[1]&&rutas[2]==rutas[1]){
        rutas = [Math.floor(Math.random() * 10),Math.floor(Math.random() * 10),Math.floor(Math.random() * 10)]
        }
        var rutaImagen = [`./tm-img/${rutas[0]}.png`,`./tm-img/${rutas[1]}.png`,`./tm-img/${rutas[2]}.png`];
        return rutaImagen;
    }
}

//PALANCIA HACIA ABAJO
palanca.addEventListener("mousedown", function () {
    palanca.src = "tm-img/down.png";
  });
  
  //PALANCA HACIA ARRIBA
  palanca.addEventListener("mouseup", function () {
    palanca.src = "tm-img/up.png";
  });

function giro() {

    if(fichas!=0){
        document.getElementById("ganaste").hidden = true
        const valores = obtenerValores();
        const comienzo = Date.now();
         if (flagSonido == true) {
         let divAudio = document.querySelector("#audio-casino");
         divAudio.innerHTML = "<audio src='Musica/cartas.mp3' autoplay type='audio/mpeg'></audio>"
         }
        function girarUnaVez(indice) {
            const ahora = Date.now();
            const tiempTrans = ahora - comienzo;
            if (tiempTrans < duracionGiro) {
                elementos[indice].src = obtenerAleatorios();
                requestAnimationFrame(() => girarUnaVez(indice));
            } else {
                elementos[indice].src = valores[indice];
                if (indice === 2) {
                    setTimeout(function() {
                        ganaONo();
                    }, 100);
                }
            }
        }
    
        for (let i = 0; i < elementos.length; i++) {
            girarUnaVez(i);
        }
    }else{
        carga.innerHTML = " ¡Carga mas fichas!"
    }
}
function reiniciar(){
fichas = 20;
fichasPerdidas = 0;
fichasGanadas = 0;
carga.innerHTML = ""
tusfichas.innerHTML = fichas
tusperdidas.innerHTML = fichasPerdidas
tusganadas.innerHTML = fichasGanadas
}

function ganaONo() {
    tusfichas.innerHTML = fichas
    tusperdidas.innerHTML = fichasPerdidas
    tusganadas.innerHTML = fichasGanadas
    if (
        elementos[0].src === elementos[1].src &&
        elementos[1].src === elementos[2].src
    ) {
         if (flagSonido == true) {
         let divAudio = document.querySelector("#audio-casino");
         divAudio.innerHTML = "<audio src='Musica/ganaste.mp3' autoplay type='audio/mpeg'></audio>"
        }
        document.getElementById("ganaste").hidden = false
    } 
}
function sonidoOffOn() {
    if (flagSonido == true) {
        let s = document.querySelector("#icono-sonido");
       s.setAttribute("class", "fas fa-volume-mute");
        flagSonido = false
    } else {
        let s = document.querySelector("#icono-sonido");
        s.setAttribute("class", "fas fa-volume-up");
        flagSonido = true;     }
}

//ITAMARACA
var array = []
function itamaraca(){
    var n = 0
    while(n==0){
        n = Math.floor(Math.random() * 10)
    }
    var semilla0 = Math.random() * n
    var semilla1 = Math.random() * n
    var semilla2 = Math.random() * n
    var xrn = 1.97
    
    var anterior = Math.abs(semilla2 - semilla0)
    var frns = Math.abs(n-(anterior*xrn))
    var ui =frns/n
    array.push(ui)
    var i=1
    while(i<10000){
        anterior = Math.abs(frns-semilla1)
        frns = Math.abs(n-(anterior*xrn))
        ui=frns/n
        array.push(ui)
        i++;
        if(i<10000){
            anterior = Math.abs(frns-semilla2)
            frns = Math.abs(n-(anterior*xrn))
            ui=frns/n
            array.push(ui)
            i++;
            if(i<10000){
                anterior = Math.abs(frns-semilla0)
                frns = Math.abs(n-(anterior*xrn))
                ui=frns/n
                array.push(ui)
                i++;
            }
        }
    }
    
}

function simulate(){
    document.getElementById("simulacion").disabled = true
    if(flagSonido == true){
        sonidoOffOn()
    }
    fichas = 10000;
    fichasPerdidas = 0;
    fichasGanadas = 0;
    for(var s=0;s<10000;s++){
        if(fichas!=0){
            obtenerValores()
            ganaONo()
        }
    }
    document.getElementById("ganaste").hidden = true
    array = []
    itamaraca()
    document.getElementById("simulacion").disabled = false
}
