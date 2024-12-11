function tieneNumeros(nombre) {
    for (let i = 0; i < nombre.length; i++) {
        if (!isNaN(nombre[i]) && nombre[i] !== " ") {
            return true;
        }
    }
    return false;
}

function tieneArroba(email) {
    return email.includes('@');
}

function telefonoValido(telefono) {
    return telefono.length === 11 && !isNaN(telefono);
  }


async function renderizarDoctores(doctores) {
    const equipoContainer = document.getElementById('equipo-medico');
    equipoContainer.innerHTML = '';
    doctores.forEach((doctor) => {
      const{
        nombre,
        imagen,
        especialidad,
        anios_experiencia,
        descripcion        
      } = doctor
      console.log('El doctor a renderizar usando desestructuring es', doctor)
      const cardHTML = `
        <div class="col profesionales">
          <div class="card" >
            <img src="${imagen}" alt="${nombre}" class="card__image-Resizing" />
            <div class="card-body">
              <h5 class="card-title">${nombre}</h5>
              <p class="card-text">${especialidad}</p>
              <p class="card-text">${anios_experiencia} años de experiencia.</p>
              <p class="card-text">${descripcion}</p>
            </div>
          </div>
        </div>
      `;
      equipoContainer.innerHTML += cardHTML;
    });
}

async function filtrarEquipo(doctores) {
  try {
    const doctorOriginal = doctores[0];
    const doctorClonado = { ...doctorOriginal, nombre: "Dr. Clonado", anios_experiencia: 99 };
    console.log('Doctor Original:', doctorOriginal);
    console.log('Doctor Clonado:', doctorClonado);

    const serviciosDisponibles = { servicios: ["Cirugía", "Consultas", "Emergencias"] };
    const doctorFusionado = { ...doctorOriginal, ...serviciosDisponibles };
    console.log('Doctor Fusionado:', doctorFusionado);

    const filtroExperiencia = document.getElementById('filtroExperiencia').value;
    const filtroServicio = document.getElementById('filtroServicio').value;
   
    if (filtroServicio) {
      doctores = doctores.filter(doctor => doctor.especialidad.toLowerCase().includes(filtroServicio.toLowerCase()));
    }
    if (filtroExperiencia) {
      doctores = doctores.filter(doctor => doctor.anios_experiencia >= parseInt(filtroExperiencia));
    }
    // algoritmo de ordenamiento por años de experiencia
    doctores.sort((a, b) => b.anios_experiencia - a.anios_experiencia);
     
    const doctoresString = JSON.stringify(doctores, null, 2);
    console.log('Doctores filtrados como JSON:', doctoresString);

    renderizarDoctores(doctores);
  } catch (error) {
    console.error('Error al cargar los doctores:', error);
  }
}

// Aqui crearemos funciones para agregar, eliminar y buscar doctores

function agregarDoctor(doctores, nuevoDoctor) {
  doctores.push(nuevoDoctor);
  console.log('Agregue doctor')
}

function eliminarDoctor(doctores) {
  doctorEliminado = doctores.pop();
  console.log('Doctor eliminado', doctorEliminado)
}
//Algoritmo de busqueda
function buscarDoctor(doctores, doctorABuscar) {
  const doctorBuscado = doctores.find(doctor => doctor.nombre === doctorABuscar);
  if (doctorBuscado) {
    console.log('Doctor encontrado:', doctorBuscado);
  } else {
    console.log('Doctor no encontrado');
  }
} 

async function cargarDoctores() {
  try {
    const response = await fetch('../assets/data/doctores.json'); 
    const doctores = await response.json();

    agregarDoctor(doctores, {
      "nombre": "Dr. Juan Perez",
      "especialidad": "Oftalmologia",
      "descripcion": "Dr. Juan Perez tiene 20 años de experiencia en la salud publica y privada especializandose en Oftalmologia, destacandose por el tratemiento de enfermedades en la retina y cornea.",
      "imagen": "../assets/img/dr_juan_perez.webp",
      "anios_experiencia": 20,
      "disponibilidad": "disponible",
      "informacion_adicional": {
        "contacto": "+569 1234 5678",
        "horas_disponibles": "9:00 - 18:00"
      }
    });
    eliminarDoctor(doctores);
    buscarDoctor(doctores, 'Dr. Carlos Ramirez');
    
    filtrarEquipo(doctores);
  } catch (error) {
    console.error('Error al cargar los doctores:', error);
  }
}

// Aqui crearemos citas
function agregarCita(citas, nuevaCita) {
  citas.push(nuevaCita);
  console.log('Agregue cita', nuevaCita)
}

function manejarPila() {
  const citas = [];
  agregarCita(citas, 'cita1')
  agregarCita(citas, 'cita2')
  agregarCita(citas, 'cita3')
  agregarCita(citas, 'cita4')
  agregarCita(citas, 'cita5')

  console.log('La ultima agendada es', citas[citas.length - 1])
  console.log('La proxima cita a atender es', citas.shift())
}

function manejarCola(){
  const colaContacto = []
  colaContacto.push('contacto1')
  colaContacto.push('contacto2')
  colaContacto.push('contacto3')
  colaContacto.push('contacto4')
  console.log('El proximo contacto a atender es', colaContacto.shift())   
}

// Programación Funcional en JavaScript
// Valores y fetch generales
let id_paciente = 'pac_01'
let id_doctor = 'doc_01' 
let valor_consulta = 30000

async function fetchPacientes() {
  try{
    const response = await fetch('../assets/data/pacientes.json'); 
    const pacientes = await response.json();
    return pacientes
  } catch (error) {
    console.error('Error al cargar los pacientes:', error);
  }  
}

//Implementa una función que use currying para calcular el costo total de los servicios de un paciente en función del número de consultas realizadas y el precio de cada consulta.
function calcularGasto(numConsultas) {
  return function (precioPorConsulta) {
    return numConsultas * precioPorConsulta;
  };
}

async function consultaGastoPaciente(id_paciente) {
    const pacientes = await fetchPacientes();  
    const pacienteBuscado = pacientes.find(paciente => paciente.id_pac == id_paciente);
    const cant_consultas = pacienteBuscado.citas_agendadas.length;
    console.log('El gasto total del paciente fue', calcularGasto(cant_consultas)(valor_consulta)); 
}
consultaGastoPaciente(id_paciente);

//Usa la función flecha para simplificar la sintaxis en una función que calcule el tiempo promedio de espera de los pacientes.
const consultaTiempoEspera = async (id_paciente) => {
  try{
    const pacientes = await fetchPacientes()
    const pacienteBuscado = pacientes.find(paciente => paciente.id_pac == id_paciente);
    const tiempoTotalEspera = pacienteBuscado.citas_agendadas.reduce((total, cita) => total + cita.tiempo_espera , 0);
    console.log('El tiempo promedio de espera del paciente', id_paciente, 'fue de', tiempoTotalEspera/pacienteBuscado.citas_agendadas.length, 'minutos')
  } catch (error) {
    console.error("Error al consultar el tiempo de espera:", error.message);
  }
}
consultaTiempoEspera(id_paciente);

//Implementa la recursión para calcular de forma recursiva el total de horas de consulta de un doctor a lo largo de la semana.
const calcularHorasRecursivo = (citas, indice = 0, tiempoTotal = 0) => {
  if (indice >= citas.length) {
    return tiempoTotal;
  }

  return calcularHorasRecursivo(
    citas,
    indice + 1,
    tiempoTotal + citas[indice].tiempo_consulta
  );
};

const consultaHorasDoctores = async (id_doc) => {
  try{
    const doctores = await fetchDoctores()
    const doctorBuscado = doctores.find(doctores => doctores.id_doc == id_doc);
    const tiempoTotalConsulta = calcularHorasRecursivo(doctorBuscado.citas_agendadas);
    const horasTotales = Math.floor(tiempoTotalConsulta / 60);
    const minutosTotales = tiempoTotalConsulta % 60;
    console.log('El total de horas de consulta del doctor', id_doc, 'fue de', horasTotales, 'horas y', minutosTotales, 'minutos')
  } catch (error) {
    console.error("Error al consultar el tiempo de atención de doctores:", error.message);
  }
}
consultaHorasDoctores(id_doctor);

// Integra composición de funciones para aplicar descuentos a los costos de consulta en base a la cantidad de consultas realizadas.
const calcularDescuento = (citas) => {
  if (citas.length >= 3) {
    return 0.2;
  }
  return 0;
}

const calcularPrecioFinal = (precio, descuento) => {
  return precio * (1 - descuento);
} 
const consultarDescuentoPacientes = async(id_paciente) => {
  try{
    const pacientes = await fetchPacientes()
    const pacienteBuscado = pacientes.find(paciente => paciente.id_pac == id_paciente);
    const precioFinal = calcularPrecioFinal(valor_consulta, calcularDescuento(pacienteBuscado.citas_agendadas));
    console.log('El precio final del paciente', id_paciente, 'fue de', precioFinal, '.El descuento fue de', calcularDescuento(pacienteBuscado.citas_agendadas)*valor_consulta)
  }catch (error) {
    console.error("Error al consultar el descuento para pacientes:", error.message);
  }
};  

consultarDescuentoPacientes(id_paciente)

// Implementa un listener para capturar el envío del formulario y muestra un mensaje de confirmación 

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("contactoForm");
  formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    const datosFormulario = {
      nombre: document.getElementById("nombre").value,
      email: document.getElementById("email").value,
      asunto: document.getElementById("asunto").value,
      mensaje: document.getElementById("mensaje").value,
    };
    console.log('Los datos ingresados son:', datosFormulario)
    alert("Gracias por contactarnos. Tu mensaje ha sido enviado.");
    formulario.reset();
  })
});

//Dispara un evento personalizado que simule la llegada de un nuevo paciente, mostrando una notificación en la página
document.addEventListener("DOMContentLoaded", () => {
  const nuevoPacienteEvent = new CustomEvent("nuevoPaciente", {
    detail: {
      nombre: "Diego Pérez",
      id_pac: "pac_09",
    },
  });
  
  document.addEventListener("nuevoPaciente", (event) => {
    const { nombre, id_pac } = event.detail; 
    alert(`Nuevo paciente llegado: 
      Nombre: ${nombre} 
      Id: ${id_pac}`)
      ;
  });
  
  setTimeout(() => {
    document.dispatchEvent(nuevoPacienteEvent);
  }, 5000);
});

//Implementa una función async/await para simular una llamada a una API REST que obtenga los datos de los doctores. Usa Promise para manejar los casos de éxito o fallo
//Implementa el manejo de errores utilizando try/catch en las funciones asíncronas, y define un callback que se invoque al fallar una petición simulada
async function fetchDoctores() {
  try{
    const response = await fetch('../assets/data/doctores.json'); 
    if(!response.ok) throw new Error('Error al cargar los doctores');
    const doctores = await response.json();
    return doctores
  } catch (error) {
    console.error('Error al cargar los doctores:', error);
  }  
}

// Programación Orientada a Objetos en JavaScript (2.5 puntos)
//Implementa una clase Doctor con las propiedades nombre, especialidad, y años de experiencia. Añade un método para mostrar la información de cada doctor y otro para calcular el total de pacientes atendidos por el doctor.
//Implementa el encapsulamiento en la clase, protegiendo la propiedad de años de experiencia mediante un getter y un setter.

class Doctor{
  constructor(nombre, especialidad, anios_experiencia){
    this.nombre = nombre;
    this.especialidad = especialidad;
    this._anios_experiencia = anios_experiencia;
    this.pacientes = ['pac_01', 'pac_02', 'pac_03'];
  }

  obtenerInformacion(){
    return `El doctor ${this.nombre} tiene ${this.anios_experiencia} años de experiencia en la especialidad de ${this.especialidad}`
  }
  calcularPacientesAtendidos(){
    return `El doctor ${this.nombre} ha atendido ${this.pacientes.length} pacientes`;
  }

  get aniosExperiencia() {
    return this.anios_experiencia;
  }

  set aniosExperiencia(nuevosAnios) {
    this.anios_experiencia = nuevosAnios; 
  }
}
// Crea una subclase de Doctor, por ejemplo Cirujano, que extienda las funcionalidades de la clase base.
// Usa el polimorfismo para sobrescribir un método en la subclase Cirujano que calcule el número de operaciones realizadas en lugar de consultas

class Cirujano extends Doctor{
  constructor(nombre, especialidad, anios_experiencia){
    super(nombre, especialidad, anios_experiencia);
    this.cirujias = ['cir_01', 'cir_02', 'cir_03'];
  }

  obtenerInformacion(){
    return `El cirujano ${this.nombre} ha hecho las siguientes cirujias: ${this.cirujias}`
  }

}

const cirjuano1 = new Cirujano('Pablo Arce' , 'Cirujano', 10);
console.log(cirjuano1.obtenerInformacion());
console.log(cirjuano1.calcularPacientesAtendidos());


function iniciar() {
  cargarDoctores();
  manejarPila();
  manejarCola();
}

window.onload = iniciar;
