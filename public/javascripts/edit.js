// 1) Recuperar el parametro id de la url
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const validarNumero = /^\d+$/;
const validarEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// 2) Recuperar los nodos con jQuery de mi HTML
const $nombre = $('input[name="nombre"]');
const $apellido = $('input[name="apellido"]');
const $telefono = $('input[name="telefono"]');
const $email = $('input[name="email"]');
// 3) Le pido al servidor la info del usuario con ese id
$.ajax(`/api/users/${id}`).done(function(user) {
    $nombre.val(user.nombre);
    $apellido.val(user.apellido);
    $telefono.val(user.telefono);
    $email.val(user.email);
});

$('#btn-edit').click(function() {

    if (!validarNumero.test($telefono.val())) {
        $("#ex1 p").html('El campo "telefono" sólo pueden ser números');
        $("#ex1").modal();
        return;
    }
    if (!validarEmail.test($email.val())) {
        $("#ex1 p").html("El e-mail es inválido");
        $("#ex1").modal();
        return;
    }

    const editUser = {
        nombre: $nombre.val(),
        apellido: $apellido.val(),
        telefono: $telefono.val(),
        email: $email.val()
    }

    $.ajax(`http://localhost:3000/api/users/${id}`, {
            method: 'PUT',
            data: editUser
        })
        .done(function() {
            $('#ex1 p').html("El usuario fue editado exitosamente!");
            $('#ex1').modal();
        })
        .fail(function(err) {
            $('#ex1 p').html("El usuario no ha sido editado");
            $('#ex1').modal();
        })
})