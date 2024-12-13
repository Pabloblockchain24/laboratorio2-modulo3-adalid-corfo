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
        descripcion,
        informacion_adicional        
      } = doctor

      const cardHTML = `
        <div class="col profesionales">
          <div class="card" >
            <img src="${imagen}" alt="${nombre}" class="card__image-Resizing" />
            <div class="card-body">
              <h5 class="card-title">${nombre}</h5>
              <p class="card-text">${especialidad}</p>
              <p class="card-text">${anios_experiencia} años de experiencia.</p>
              <p class="card-text">${descripcion}</p>
               <button 
                  class="btn btn-primary obtener-info-btn" 
                  data-info="${nombre} es especialista en ${especialidad} con ${anios_experiencia} años de experiencia. Contacto ${informacion_adicional.contacto}" >
                  Obtener más información
              </button>            
            </div>
          </div>
        </div>
      `;
      equipoContainer.innerHTML += cardHTML;
    });

    equipoContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('obtener-info-btn')) {
          const additionalInfo = event.target.getAttribute('data-info');
          alert(additionalInfo);
      }
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

//Leemos citas
async function fetchCitas() {
  try{
    const response = await fetch('../assets/data/citas.json'); 
    const pacientes = await response.json();
    return pacientes
  } catch (error) {
    console.error('Error al cargar los pacientes:', error);
  }  
}

async function createCita(nuevaCita){
  const citas = await fetchCitas();  
  citas.push(nuevaCita)
  console.log('Agregue cita', nuevaCita)
}

let nuevaReserva =  {
  "id_cita": "cita_99",
  "id_paciente": "pac_15",
  "id_doctor": "doc_25",
  "fecha": "12-12-2024",
  "hora_agendada": "11:00",
  "hora_atendida": "13:30",
  "tiempo_espera": 40,
  "valor_consulta": 50000
}

createCita(nuevaReserva);

async function deleteCita(id_cita) {
  const citas = await fetchCitas();  
  const nuevoArray = citas.filter(cita => cita.id_cita != id_cita)
  console.log('Cita borrada correctamente. Nuevo array es:', nuevoArray )
}

deleteCita('cita_02')

async function manejarPila() {
  const citas = await fetchCitas();  
  console.log('La ultima agendada es', citas[citas.length - 1])
  console.log('La proxima cita a atender es', citas.shift())
}

function manejarCola(){
  const colaContacto = []
  colaContacto.push('contacto1')
  colaContacto.push('contacto2')
  colaContacto.push('contacto3')
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

// Programación Orientada a Objetos en JavaScript
//Crea una clase Doctor con subclases como Cirujano o Pediatra, aplicando encapsulación, herencia, y polimorfismo.
//Implementa métodos para calcular costos de consulta, gestionar disponibilidad, etc.
class Doctor{
  constructor(id_doc, nombre, especialidad, descripcion, imagen, anios_experiencia, disponibilidad){
    this.id_doc = id_doc
    this.nombre = nombre;
    this.especialidad = especialidad;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this._anios_experiencia = anios_experiencia;
    this.disponibilidad = disponibilidad;
    this.informacion_adicional = [];
    this.citas_agendadas = []
  }

  obtenerInformacion(){
    return `El doctor ${this.nombre} tiene ${this.anios_experiencia} años de experiencia en la especialidad de ${this.especialidad}`
  }
  calcularCostosConsulta(){
    totalConsulta = this.citas_agendadas.reduce((total,cita) => total + cita.valor_consulta, 0)
    return `La consulta tiene un costo total de $${totalConsulta}.`;
  }
  gestionarDisponibilidad(nuevaDisponibilidad){
    this.disponibilidad = nuevaDisponibilidad;
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

// Lectura y renderizado de servicios medicos en el home   
async function cargarServiciosMedicos() {
  try{
    const response = await fetch('../assets/data/servicios_medicos.json'); 
    if(!response.ok) throw new Error('Error al cargar servicios medicos');
    const servicios_medicos = await response.json();
    renderizarServicios(servicios_medicos);
  } catch (error) {
    console.error('Error al cargar los servicios_medicos:', error);
  }  
}

async function renderizarServicios(servicios) {
  const container = document.getElementById('servicios');
  container.innerHTML = '';

  servicios.forEach(servicio => {
    const { nombre_servicio, descripcion, imagen } = servicio; 
    const cardServicio = `
     <div class="col-12 col-md-6 col-lg-4 mb-4">
      <div class="card" style="width: 18rem">
        <img
          src="${imagen}"
          alt="${nombre_servicio}"
          width="150px"
        />
      <div class="card-body">
        <h5 class="card-title">${nombre_servicio}</h5>
        <p class="card-text">${descripcion}</p>
      </div>
    </div>
  </div>
  `;
  container.innerHTML += cardServicio;

  })
};


function iniciar() {
  cargarServiciosMedicos();
  cargarDoctores();
  manejarPila();
  manejarCola();
}

window.onload = iniciar;
