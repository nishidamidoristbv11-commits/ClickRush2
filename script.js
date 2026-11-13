// Fotografías de componentes de computadora alojadas en Wikimedia Commons.
// Si una fotografía no carga, se muestra una alternativa visual con su nombre.
const componentes = {
  mouse: {
    nombre: "Mouse",
    imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/A%20computer%20mouse.jpg",
    emoji: "🖱️",
    funcion: "Permite mover el puntero, seleccionar elementos, hacer clic y arrastrar objetos en la pantalla."
  },
  teclado: {
    nombre: "Teclado",
    imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/Computer%20keyboard.jpg",
    emoji: "⌨️",
    funcion: "Permite escribir letras, números y comandos en la computadora."
  },
  monitor: {
    nombre: "Monitor",
    imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/Computer%20monitor.jpg",
    emoji: "🖥️",
    funcion: "Muestra imágenes, textos, videos y toda la información que procesa la computadora."
  },
  placa: {
    nombre: "Placa madre",
    imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/Computer%20motherboard.jpg",
    emoji: "🟩",
    funcion: "Es la tarjeta principal que conecta y permite la comunicación entre los componentes."
  },
  ram: {
    nombre: "Memoria RAM",
    imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/Imagen%20Memoria%20RAM.jpg",
    emoji: "🧩",
    funcion: "Almacena temporalmente los datos que la computadora necesita mientras está funcionando."
  },
  cpu: {
    nombre: "Procesador CPU",
    imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/Cpu-processor.jpg",
    emoji: "🔲",
    funcion: "Ejecuta instrucciones y realiza operaciones. Es uno de los componentes principales del PC."
  },
  fuente: {
    nombre: "Fuente de poder",
    imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/Power%20supply.JPG",
    emoji: "🔌",
    funcion: "Transforma y distribuye la energía eléctrica que necesitan los componentes."
  },
  ssd: {
    nombre: "Disco SSD",
    imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/SSD-Samsung-EVO-860-250Gb.jpg",
    emoji: "💾",
    funcion: "Almacena archivos, programas y el sistema operativo. Es una unidad de almacenamiento rápida."
  },
  hdd: {
    nombre: "Disco duro HDD",
    imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/3.5%20inch%20hard%20disk%20drive%2C%20side%20view.jpg",
    emoji: "💽",
    funcion: "Guarda documentos, fotografías, programas y otros archivos de forma permanente."
  },
  ventilador: {
    nombre: "Ventilador",
    imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/Cooler2.jpg",
    emoji: "🌀",
    funcion: "Ayuda a mantener una temperatura adecuada al mover el aire dentro del gabinete."
  },
  grafica: {
    nombre: "Tarjeta gráfica",
    imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/8800GT%20aros%20tails.png",
    emoji: "🎮",
    funcion: "Procesa gráficos y genera las imágenes que se muestran en el monitor."
  },
  gabinete: {
    nombre: "Gabinete",
    imagen: "https://commons.wikimedia.org/wiki/Special:FilePath/Gabinet99.jpg",
    emoji: "🖥️",
    funcion: "Es la estructura que protege y contiene los componentes internos de la computadora."
  }
};

// Diez niveles: 3 básicos, 3 intermedios, 3 avanzados y un desafío final.
const niveles = [
  { dificultad: "BÁSICO", nombre: "Conoce los periféricos", piezas: ["mouse", "teclado", "monitor"] },
  { dificultad: "BÁSICO", nombre: "Primeros componentes", piezas: ["mouse", "teclado", "monitor", "cpu"] },
  { dificultad: "BÁSICO", nombre: "Memoria y conexión", piezas: ["placa", "ram", "cpu", "monitor"] },

  { dificultad: "INTERMEDIO", nombre: "Almacenamiento", piezas: ["hdd", "ssd", "placa", "ram"] },
  { dificultad: "INTERMEDIO", nombre: "Energía y refrigeración", piezas: ["fuente", "ventilador", "cpu", "gabinete"] },
  { dificultad: "INTERMEDIO", nombre: "Componentes internos", piezas: ["placa", "ram", "cpu", "fuente", "ventilador", "hdd"] },

  { dificultad: "AVANZADO", nombre: "Potencia gráfica", piezas: ["grafica", "placa", "fuente", "ram", "cpu"] },
  { dificultad: "AVANZADO", nombre: "Organiza el equipo", piezas: ["gabinete", "placa", "fuente", "ssd", "hdd", "ventilador"] },
  { dificultad: "AVANZADO", nombre: "Preparación profesional", piezas: ["mouse", "teclado", "monitor", "gabinete", "placa", "cpu", "ram", "grafica"] },

  { dificultad: "RETO FINAL", nombre: "¡El estante completo!", piezas: [
    "mouse", "teclado", "monitor", "gabinete", "placa", "cpu",
    "ram", "fuente", "ssd", "hdd", "ventilador", "grafica"
  ] }
];

let nivelActual = 0;
let puntuacion = 0;
let seleccionActual = null;
let piezasColocadas = 0;
let piezasDelNivel = [];

const estante = document.getElementById("estante");
const zonaPiezas = document.getElementById("piezas");
const mensaje = document.getElementById("mensaje");

const nivelTexto = document.getElementById("nivelTexto");
const puntosTexto = document.getElementById("puntos");
const dificultadTexto = document.getElementById("dificultad");
const instruccion = document.getElementById("instruccion");
const barraProgreso = document.getElementById("barraProgreso");

const modalInfo = document.getElementById("modalInfo");
const imagenInfo = document.getElementById("imagenInfo");
const tituloInfo = document.getElementById("tituloInfo");
const textoInfo = document.getElementById("textoInfo");

function cargarImagen(img, componente) {
  img.src = componente.imagen;
  img.alt = componente.nombre;

  img.onerror = () => {
    img.onerror = null;
    img.style.display = "none";

    const reemplazo = document.createElement("div");
    reemplazo.className = "imagen-fallback";
    reemplazo.textContent = componente.emoji;
    reemplazo.style.fontSize = "48px";
    reemplazo.style.padding = "15px";
    img.parentNode.insertBefore(reemplazo, img);
  };
}

function iniciarNivel() {
  const nivel = niveles[nivelActual];

  piezasColocadas = 0;
  seleccionActual = null;
  piezasDelNivel = [...nivel.piezas];

  nivelTexto.textContent = `Nivel ${nivelActual + 1} de 10`;
  puntosTexto.textContent = `⭐ ${puntuacion} puntos`;
  dificultadTexto.textContent = nivel.dificultad;
  instruccion.textContent = nivel.nombre;
  barraProgreso.style.width = `${((nivelActual + 1) / 10) * 100}%`;

  estante.innerHTML = "";
  zonaPiezas.innerHTML = "";

  // Crear los espacios con la silueta de cada componente.
  piezasDelNivel.forEach(id => {
    const pieza = componentes[id];

    const espacio = document.createElement("div");
    espacio.className = "silueta";
    espacio.dataset.componente = id;

    const siluetaImg = document.createElement("img");
    cargarImagen(siluetaImg, pieza);

    const etiqueta = document.createElement("span");
    etiqueta.textContent = "¿Qué pieza va aquí?";

    espacio.appendChild(siluetaImg);
    espacio.appendChild(etiqueta);

    espacio.addEventListener("click", () => {
      if (seleccionActual) {
        colocarPieza(seleccionActual, espacio);
      }
    });

    espacio.addEventListener("dragover", evento => {
      evento.preventDefault();
      espacio.classList.add("seleccionable");
    });

    espacio.addEventListener("dragleave", () => {
      espacio.classList.remove("seleccionable");
    });

    espacio.addEventListener("drop", evento => {
      evento.preventDefault();
      espacio.classList.remove("seleccionable");

      const id = evento.dataTransfer.getData("text/plain");
      if (id) colocarPieza(id, espacio);
    });

    estante.appendChild(espacio);
  });

  // Mezclar las piezas para que no aparezcan en el mismo orden.
  const piezasMezcladas = [...piezasDelNivel].sort(() => Math.random() - 0.5);

  piezasMezcladas.forEach(id => {
    const pieza = componentes[id];

    const tarjeta = document.createElement("div");
    tarjeta.className = "pieza";
    tarjeta.draggable = true;
    tarjeta.dataset.componente = id;

    const img = document.createElement("img");
    cargarImagen(img, pieza);

    const nombre = document.createElement("b");
    nombre.textContent = pieza.nombre;

    tarjeta.appendChild(img);
    tarjeta.appendChild(nombre);

    // Clic izquierdo: seleccionar.
    tarjeta.addEventListener("click", () => {
      seleccionarPieza(id, tarjeta);
    });

    // Arrastrar y soltar.
    tarjeta.addEventListener("dragstart", evento => {
      evento.dataTransfer.setData("text/plain", id);
      seleccionActual = id;
    });

    tarjeta.addEventListener("dragend", () => {
      document.querySelectorAll(".silueta").forEach(slot => {
        slot.classList.remove("seleccionable");
      });
    });

    // Clic derecho: mostrar información.
    tarjeta.addEventListener("contextmenu", evento => {
      evento.preventDefault();
      mostrarInformacion(id);
    });

    zonaPiezas.appendChild(tarjeta);
  });

  mensaje.textContent = "Selecciona una pieza o arrástrala hasta su silueta.";
}

function seleccionarPieza(id, tarjeta) {
  document.querySelectorAll(".pieza").forEach(p => {
    p.classList.remove("seleccionada");
  });

  seleccionActual = id;
  tarjeta.classList.add("seleccionada");

  mensaje.textContent = `${componentes[id].nombre} seleccionado. Ahora haz clic en su silueta.`;
}

function colocarPieza(id, espacio) {
  if (!id || espacio.classList.contains("correcto")) return;

  const idEsperado = espacio.dataset.componente;

  if (id === idEsperado) {
    const info = componentes[id];

    espacio.classList.add("correcto");
    espacio.innerHTML = "";

    const foto = document.createElement("img");
    cargarImagen(foto, info);

    const nombre = document.createElement("span");
    nombre.textContent = info.nombre;

    espacio.appendChild(foto);
    espacio.appendChild(nombre);

    const tarjeta = document.querySelector(
      `.pieza[data-componente="${id}"]`
    );

    if (tarjeta) {
      tarjeta.classList.add("colocada");
      tarjeta.classList.remove("seleccionada");
    }

    piezasColocadas++;
    puntuacion += 10;
    puntosTexto.textContent = `⭐ ${puntuacion} puntos`;

    seleccionActual = null;
    mensaje.textContent = `¡Correcto! Has colocado ${info.nombre}. +10 puntos.`;

    if (piezasColocadas === piezasDelNivel.length) {
      setTimeout(completarNivel, 900);
    }
  } else {
    puntuacion = Math.max(0, puntuacion - 2);
    puntosTexto.textContent = `⭐ ${puntuacion} puntos`;
    mensaje.textContent = "❌ Esa no es su silueta. ¡Inténtalo otra vez!";
  }
}

function mostrarInformacion(id) {
  const info = componentes[id];

  imagenInfo.style.display = "block";
  imagenInfo.src = info.imagen;
  imagenInfo.alt = info.nombre;
  imagenInfo.onerror = () => {
    imagenInfo.onerror = null;
    imagenInfo.style.display = "none";
  };

  tituloInfo.textContent = info.nombre;
  textoInfo.textContent = info.funcion;
  modalInfo.classList.add("visible");
}

function cerrarInformacion() {
  modalInfo.classList.remove("visible");
}

function completarNivel() {
  if (nivelActual < niveles.length - 1) {
    mensaje.textContent = "🎉 ¡Nivel completado! Preparando el siguiente...";

    setTimeout(() => {
      nivelActual++;
      iniciarNivel();
    }, 1300);
  } else {
    document.getElementById("pantallaFinal").classList.remove("oculto");
    document.getElementById("puntuacionFinal").textContent =
      `Puntuación total: ${puntuacion} puntos`;

    document.getElementById("puntuacionFinal").style.color = "#73eac5";
  }
}

function comenzarJuego() {
  nivelActual = 0;
  puntuacion = 0;

  document.getElementById("pantallaInicio").classList.add("oculto");
  document.getElementById("pantallaFinal").classList.add("oculto");

  iniciarNivel();
}

document.getElementById("iniciar").addEventListener("click", comenzarJuego);
document.getElementById("reiniciar").addEventListener("click", comenzarJuego);
document.getElementById("cerrarInfo").addEventListener("click", cerrarInformacion);
document.getElementById("aceptarInfo").addEventListener("click", cerrarInformacion);

modalInfo.addEventListener("click", evento => {
  if (evento.target === modalInfo) cerrarInformacion();
});