const nombreInput = document.getElementById("nombre");
const motivacionInput = document.getElementById("motivacion");
const metaInput = document.getElementById("meta");
const interesesInput = document.getElementById("intereses");
const estadoInput = document.getElementById("estado");
const enviarBtn = document.getElementById("enviarEstado");
const respuestaDiv = document.getElementById("respuesta");
const seguimientoDiv = document.getElementById("seguimiento");

function obtenerFrase(estado, motivacion, meta) {
  const frases = {
    bien: [`¡Genial! Mantén esa energía para lograr tu meta de ${meta} 💪`,
           `Tu actitud positiva te acerca a ${motivacion} ✨`,
           `Hoy es un buen día para avanzar por ${motivacion} 🌞`],
    cansado: [`Respira profundo. Cada llamada te acerca a ${meta} 🌱`,
              `Tu esfuerzo vale la pena, piensa en ${motivacion} 💚`,
              `Descansa tu mente, pero no tu propósito: ${meta} 🧘`],
    estresado: [`Tú puedes con esto. ${motivacion} te espera con orgullo 💪`,
                `No estás solo. Cada reto te acerca a ${meta} 🌟`,
                `Respira. El caos no dura para siempre, y ${motivacion} lo sabe 🌬️`],
    motivado: [`¡Esa actitud es contagiosa! ¡Vamos por ${meta} 🔥!`,
               `Tu energía mueve montañas. ${motivacion} está contigo 🚀`,
               `Sigue así, estás construyendo el futuro que soñaste para ${motivacion} 🏗️`]
  };
  const opciones = frases[estado] || [`¡Vamos con todo por ${meta}!`];
  return opciones[Math.floor(Math.random() * opciones.length)];
}

function seguimiento(nombre, motivacion) {
  seguimientoDiv.innerHTML = `
    <p>${nombre}, ¿ya vendiste?</p>
    <select id="venta">
      <option value="si">Sí</option>
      <option value="no">No</option>
    </select>
    <button id="responderVenta">Responder</button>
  `;
  document.getElementById("responderVenta").addEventListener("click", () => {
    const venta = document.getElementById("venta").value;
    const mensaje = document.createElement("p");
    mensaje.innerHTML = venta === "si"
      ? `¡Excelente trabajo, ${nombre}! ${motivacion} estaría orgulloso 🔥💼`
      : `No te preocupes, ${nombre}, cada llamada es una nueva oportunidad. ¡Hazlo por ${motivacion}! 💪`;
    seguimientoDiv.appendChild(mensaje);
    const pausa = document.createElement("p");
    pausa.innerHTML = 'Tómate 2 minutos para estirarte. Tu cuerpo también trabaja duro 🧘‍♂️';
    seguimientoDiv.appendChild(pausa);
  });
}

function lanzarContenido(intereses) {
  const contenido = document.createElement("div");
  contenido.style.marginTop = "20px";
  if (intereses.includes("humor")) {
    contenido.innerHTML = "¿Sabías que los call centers son como el WiFi? A veces tienen buena señal, pero nadie quiere conectarse 😂";
  } else if (intereses.includes("tecnología")) {
    contenido.innerHTML = "Última noticia tech: Ya hay auriculares que detectan tu estado de ánimo con IA 🤯";
  } else if (intereses.includes("deportes")) {
    contenido.innerHTML = "En deportes: el equipo sorpresa del torneo está invicto 🏆";
  } else if (intereses.includes("música")) {
    contenido.innerHTML = "Escuchar tu canción favorita puede mejorar tu rendimiento en llamadas 🎶";
  } else if (intereses.includes("animales")) {
    contenido.innerHTML = "Tu mascota te espera con orgullo. ¡Hazlo por ella! 🐾";
  }
  seguimientoDiv.appendChild(contenido);
}

enviarBtn.addEventListener("click", () => {
  const nombre = nombreInput.value.trim();
  const motivacion = motivacionInput.value.trim();
  const meta = metaInput.value.trim();
  const estado = estadoInput.value;
  const intereses = Array.from(interesesInput.selectedOptions).map(opt => opt.value);

  if (!nombre || !motivacion || !meta || intereses.length === 0) {
    alert("Por favor completa todos los campos.");
    return;
  }

  const frase = obtenerFrase(estado, motivacion, meta);
  respuestaDiv.innerHTML = `<p>${nombre}, ${frase}</p>`;
  seguimientoDiv.innerHTML = "";

  setTimeout(() => seguimiento(nombre, motivacion), 10000);
  setTimeout(() => lanzarContenido(intereses), 20000);
  setTimeout(() => {
    alert(`${nombre}, es momento de actualizar tu motivación e intereses 💡`);
    location.reload();
  }, 3600000); // 1 hora
});
