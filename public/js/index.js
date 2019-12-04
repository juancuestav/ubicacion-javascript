const socket = io();

//DOM
let usuario = document.getElementById('usuario');
let ubicacion = document.getElementById('ubicacion');
let boton = document.getElementById('boton');

boton.addEventListener('click', function(){
    socket.emit('mensaje', {usuario: usuario.value});
})

socket.on('ubicacion', (data) => {
    ubicacion.innerHTML = data;
});