function Turno(nombre, turno) {
    this.nombre = nombre;
    this.turno = turno;
}

let listaDeTurnos = [];

function registrarTurno() {
    let deseaTurno = confirm("¿Desea sacar un turno?");

    if (deseaTurno) {
        let nombre = prompt("Ingrese el nombre").toLowerCase();

        if (!isNaN(nombre)) {
            alert("Nombre incorrecto. No puede ser un número.");
        } else {
            let nuevoTurno = new Turno(nombre, listaDeTurnos.length + 1);
            listaDeTurnos.push(nuevoTurno);
            alert(`Turno #${nuevoTurno.turno} registrado para ${nuevoTurno.nombre}`);
        }
    } else {
        alert("No se registró ningún turno.");
    }
}

for (let turno = 1; turno <= 10; turno++) {
    registrarTurno();
}