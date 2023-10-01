var fichas = 20;
var fichasPerdidas = 0;
var fichasGanadas = 0;
var maxSimulation = 1000;
var duracionGiro = 300;
const carga = document.getElementById("carga");
const tusfichas = document.getElementById("tus-fichas-info");
const tusganadas = document.getElementById("tus-ganadas-info");
const tusperdidas = document.getElementById("tus-perdidas-info");
reiniciar();
const elementos = document.querySelectorAll(".slot img");
const palanca = document.getElementById("palanca");
var flagSonido = false;
const sonido = document.querySelector("#icono-sonido");
sonido.addEventListener("click", sonidoOffOn);
const simulacion = document.getElementById("simulacion");
simulacion.addEventListener("click", simulate);
const normal = document.getElementById("normal");
normal.addEventListener("click", vernormal);
const uniforme = document.getElementById("uniforme");
uniforme.addEventListener("click", veruniforme);
const geometrica = document.getElementById("geometrica");
geometrica.addEventListener("click", vergeometrica);
const guardarG = document.getElementById("guardar-generador");
guardarG.addEventListener("click", guardarGenerador);

var r=0 //indice de u
var maxN = 20;
var n=obtenerN()
var semilla0 = Math.random() * n
var semilla1 = Math.random() * n
var semilla2 = Math.random() * n
var xrn = 1.97
var array = []
itamaraca()

function reiniciar(){
    fichas = 20;
    fichasPerdidas = 0;
    fichasGanadas = 0;
    carga.innerHTML = ""
    tusfichas.innerHTML = fichas
    tusperdidas.innerHTML = fichasPerdidas
    tusganadas.innerHTML = fichasGanadas
}

//ITAMARACA

function itamaraca(){

    console.log("Itamaraca: N="+n+" S0="+semilla0.toFixed(2)+" S1="+semilla1.toFixed(2)+" S2="+semilla2.toFixed(2)+" Xrn="+xrn)
    
    var anterior = Math.abs(semilla2 - semilla0)
    var frns = Math.abs(n-(anterior*xrn))
    var ui =frns/n
    array.push(ui)
    var i=1
    while(i<maxSimulation){
        anterior = Math.abs(frns-semilla1)
        frns = Math.abs(n-(anterior*xrn))
        ui=frns/n
        array.push(ui)
        i++;
        if(i<maxSimulation){
            anterior = Math.abs(frns-semilla2)
            frns = Math.abs(n-(anterior*xrn))
            ui=frns/n
            array.push(ui)
            i++;
            if(i<maxSimulation){
                anterior = Math.abs(frns-semilla0)
                frns = Math.abs(n-(anterior*xrn))
                ui=frns/n
                array.push(ui)
                i++;
            }
        }
    }
}

function vertragamonedas() {
    document.getElementById("contenedorslot").hidden = false
    document.getElementById("contenedorsimu").hidden = true
}
 function versimulador() {
    document.getElementById("problema").hidden = false
    document.getElementById("simulador-normal").hidden = true
    document.getElementById("simulador-geometrica").hidden = true
    document.getElementById("simulador-uniforme").hidden = true
    document.getElementById("contenedorslot").hidden = true
    document.getElementById("contenedorsimu").hidden = false
    document.getElementById("simulador-normal-response").hidden = true
    document.getElementById("simulador-uniforme-response").hidden = true
    document.getElementById("simulador-geometrica-response").hidden = true
    document.getElementById("buttons-distribution").hidden = false
    document.getElementById("generador-contenedor").hidden = true
}

 function verGenerador() {
    document.getElementById("problema").hidden = true
    document.getElementById("simulador-normal").hidden = true
    document.getElementById("simulador-geometrica").hidden = true
    document.getElementById("simulador-uniforme").hidden = true
    document.getElementById("contenedorslot").hidden = true
    document.getElementById("contenedorsimu").hidden = false
    document.getElementById("simulador-normal-response").hidden = true
    document.getElementById("simulador-uniforme-response").hidden = true
    document.getElementById("simulador-geometrica-response").hidden = true
    document.getElementById("buttons-distribution").hidden = true
    document.getElementById("generador-contenedor").hidden = false
    document.getElementById("n").innerHTML = n
    document.getElementById("s0").innerHTML = semilla0.toFixed(2)
    document.getElementById("s1").innerHTML = semilla1.toFixed(2)
    document.getElementById("s2").innerHTML = semilla2.toFixed(2)
    document.getElementById("xrn-resp").innerHTML = xrn
    document.getElementById("cant-resp").innerHTML = maxSimulation

    document.getElementById('cant-input').value = maxSimulation
    document.getElementById('n-input').value = obtenerNrand()
    document.getElementById('s0-input').value = (Math.random()*nrand).toFixed(2)
    document.getElementById('s1-input').value = (Math.random()*nrand).toFixed(2)
    document.getElementById('s2-input').value = (Math.random()*nrand).toFixed(2)
    document.getElementById('xrn').value = xrn
}

function obtenerN(){
    n=0
    while(n==0){n = Math.floor(Math.random() * maxN)}
    return n
}

var nrand=0
function obtenerNrand(){
    nrand=0
    while(nrand==0){nrand = Math.floor(Math.random() * maxN)}
    return nrand
}

function guardarGenerador(){
    maxSimulation = Number(document.getElementById('cant-input').value)
    n = Number(document.getElementById('n-input').value)
    semilla0 = Number(document.getElementById('s0-input').value)
    semilla1 = Number(document.getElementById('s1-input').value)
    semilla2 =Number(document.getElementById('s2-input').value)
    xrn = Number(document.getElementById('xrn').value)
    array = []
    itamaraca()
    document.getElementById("n").innerHTML = n
    document.getElementById("s0").innerHTML = semilla0
    document.getElementById("s1").innerHTML = semilla1
    document.getElementById("s2").innerHTML = semilla2
    document.getElementById("xrn-resp").innerHTML = xrn
    document.getElementById("cant-resp").innerHTML = maxSimulation
 }

//FUNCIONES DE DISTRIBUCION// 

 function vernormal() {
    document.getElementById("problema").hidden = true
    document.getElementById("simulador-uniforme").hidden = true
    document.getElementById("simulador-geometrica").hidden = true
    document.getElementById("simulador-normal").hidden = false
    document.getElementById("simulador-uniforme-response").hidden = true
    document.getElementById("simulador-geometrica-response").hidden = true
}

const simularN = document.getElementById("simular-normal");
simularN.addEventListener("click", simularnormal);

function simularnormal() {
    array = []
    itamaraca()
    var media = Number(document.getElementById("media-input").value)
    var desv = Number(document.getElementById("desv-input").value)
    var tiempo = Number(document.getElementById("tiempo-input").value)

    var x=0;
    for(var i=1; i<=tiempo;i++){
        x = x+distribucionNormal(media,desv)
    }
    var random = 0;
    var devueltas = 0;
    for(i=1;i<=x;i++){
        random = numeroRandom()
        if(random<=0.01){
            devueltas+=20;
        }
        else {
            if(random<=0.03){
                devueltas+=10;
            }
            else {
                if(random<=0.06){
                    devueltas+=6;
                }
                else {
                    if(random<=0.11){
                        devueltas+=4;
                    }
                    else {
                        if(random<=0.19){
                            devueltas+=2;
                        }
                    }
                }
            }
        }
    }
    var neto = x - devueltas

    document.getElementById("simulador-normal-response").hidden = false

    const ingresadas = document.getElementById("fichas-ingresadas");
    ingresadas.innerHTML=x.toFixed(2)
    const develtas = document.getElementById("fichas-devueltas");
    develtas.innerHTML=devueltas.toFixed(2)
    const recaudadas = document.getElementById("fichas-recaudadas");
    recaudadas.innerHTML=neto.toFixed(2)

    document.getElementById("media").innerHTML = media
    document.getElementById("desviacion").innerHTML = desv
    document.getElementById("tiempo1").innerHTML = tiempo
    document.getElementById("tiempo2").innerHTML = tiempo
    document.getElementById("tiempo3").innerHTML = tiempo
}

function distribucionNormal(media,desviac){
    var sum=0;
    for(var i=1;i<=12;i++){
        sum=sum+numeroRandom()
    }
    var x = desviac*(sum-6)+media
    return x;
}

function veruniforme() {
    document.getElementById("problema").hidden = true
    document.getElementById("simulador-normal").hidden = true
    document.getElementById("simulador-geometrica").hidden = true
    document.getElementById("simulador-uniforme").hidden = false
    document.getElementById("simulador-normal-response").hidden = true
    document.getElementById("simulador-geometrica-response").hidden = true
}

const simularU = document.getElementById("simular-uniforme");
simularU.addEventListener("click", simularuniforme);

function simularuniforme(){
    array = []
    itamaraca()
    var a  = Number(document.getElementById("a-input").value)
    var b = Number(document.getElementById("b-input").value)
    var jugadores = Number(document.getElementById("jugadores-input").value)

    var x=0;
    for(var i=1; i<=jugadores;i++){
        x = x+distribucionuniforme(a,b)
    }

    document.getElementById("simulador-uniforme-response").hidden = false

    const usoMaquina = document.getElementById("uso-maquina");
    usoMaquina.innerHTML=x.toFixed(2)
    document.getElementById("a").innerHTML = a
    document.getElementById("b").innerHTML = b
    document.getElementById("jugadores").innerHTML = jugadores
}

function distribucionuniforme(a,b){
    var x = a+(b-a)*numeroRandom()
    return x;
}

 function vergeometrica() {
    document.getElementById("problema").hidden = true
    document.getElementById("simulador-normal").hidden = true
    document.getElementById("simulador-uniforme").hidden = true
    document.getElementById("simulador-geometrica").hidden = false
    document.getElementById("simulador-normal-response").hidden = true
    document.getElementById("simulador-uniforme-response").hidden = true
}

const simularG = document.getElementById("simular-geometrica");
simularG.addEventListener("click", simulargeometrica);

function simulargeometrica(){
    array = []
    itamaraca()
    var p  = Number(document.getElementById("p-input").value)

    var x = distribuciongeometrica(p/100)

    document.getElementById("simulador-geometrica-response").hidden = false

    const fichasN = document.getElementById("fichas-necesarias");
    fichasN.innerHTML=x
    document.getElementById("p").innerHTML = p
}

function distribuciongeometrica(p){
    var x = 0
    while(numeroRandom()>p){
        x=x+1
    }
    return x;
}

//FUNCIONES DE DISTRIBUCION//

palanca.addEventListener("click", giro);

function obtenerAleatorios() {
    var numeroAleatorio = Math.floor(Math.random() * 10);
    var rutaImagen = `./tm-img/${numeroAleatorio}.png`;
    return rutaImagen;
}

function numeroRandom(){
    r++;
    if(r==maxSimulation){r=0}
    return array[r]
}
function obtenerValores() {
    var random = numeroRandom()

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

function simulate(){
    document.getElementById("simulacion").disabled = true
    if(flagSonido == true){
        sonidoOffOn()
    }
    fichas = maxSimulation;
    fichasPerdidas = 0;
    fichasGanadas = 0;
    for(var s=0;s<maxSimulation;s++){
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

