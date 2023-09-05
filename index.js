cargarListaDeTurnos();

function cargarListaDeTurnos() {
    const listaDeTurnos = JSON.parse(localStorage.getItem('listaDeTurnos')) || [];
    actualizarListaDeTurnos(listaDeTurnos);
}

async function registrarTurno() {
    const { value: nombre } = await Swal.fire({
        title: 'Ingrese su nombre',
        input: 'text',
        inputLabel: 'Nombre',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return 'Por favor, ingrese un nombre válido';
            }
        }
    });

    if (nombre === undefined) {

        return;
    }

    const nombreLowerCase = nombre.toLowerCase();

    if (!isNaN(nombreLowerCase)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Nombre incorrecto. No puede ser un número o símbolo.',
        });
        return;
    }

    let listaDeTurnos = JSON.parse(localStorage.getItem('listaDeTurnos')) || [];

    const nuevoTurno = { nombre, turno: listaDeTurnos.length + 1 };

    listaDeTurnos.push(nuevoTurno);

    localStorage.setItem('listaDeTurnos', JSON.stringify(listaDeTurnos));

    Swal.fire({
        icon: 'success',
        title: 'Turno registrado',
        text: `Turno #${nuevoTurno.turno} registrado para ${nuevoTurno.nombre}`,
    });

    actualizarListaDeTurnos(listaDeTurnos);
}

async function cancelarTurno() {
    const { value: numeroDeTurno } = await Swal.fire({
        title: 'Ingrese el número de turno a cancelar',
        input: 'text',
        inputLabel: 'Número de Turno',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value || isNaN(value)) {
                return 'Por favor, ingrese un número de turno válido';
            }
        }
    });

    if (numeroDeTurno === undefined) {

        return;
    }

    const turnoCancelado = parseInt(numeroDeTurno);

    let listaDeTurnos = JSON.parse(localStorage.getItem('listaDeTurnos')) || [];

    const index = listaDeTurnos.findIndex(turno => turno.turno === turnoCancelado);

    if (index === -1) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Número de turno no encontrado.',
        });
        return;
    }

    const turnoCanceladoInfo = listaDeTurnos[index];

    Swal.fire({
        icon: 'info',
        title: 'Turno cancelado',
        text: `Turno #${turnoCanceladoInfo.turno} para ${turnoCanceladoInfo.nombre} ha sido cancelado.`,
    });

    listaDeTurnos[index].cancelado = true;

    localStorage.setItem('listaDeTurnos', JSON.stringify(listaDeTurnos));

    actualizarListaDeTurnos(listaDeTurnos);
}

function actualizarListaDeTurnos(turnos) {
    const listaDeTurnosElement = document.getElementById("listaDeTurnos");
    listaDeTurnosElement.innerHTML = "";

    turnos.forEach(turno => {
        const li = document.createElement("li");
        li.textContent = `Turno #${turno.turno} - ${turno.nombre}`;
        listaDeTurnosElement.append(li);
    });
}

const botonPedirTurno = document.getElementById("pedirTurno");
botonPedirTurno.addEventListener("click", registrarTurno);

const botonCancelarTurno = document.getElementById("cancelarTurno");
botonCancelarTurno.addEventListener("click", cancelarTurno);
