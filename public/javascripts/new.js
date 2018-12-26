function esValido(user) {
    const validarNumero = /^\d+$/;
    const validarEmail = /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (user.nombre.length > 30) {
        return false;
    }
    if (user.apellido.length > 30) {
        return false;
    }
    if (!validarEmail.test(user.email)) {
        return false;
    }
    if (!validarNumero.test(user.telefono)) {
        return false;
    }
    return true;
}

$('form button').click(function() {
    const elNuevoUsuario = {
        nombre: $('input[name="name"]').val(),
        apellido: $('input[name="lastname"]').val(),
        telefono: $('input[name="phone"]').val(),
        email: $('input[name="email"]').val()
    };

    if (!esValido(elNuevoUsuario)) {
        $('#ex1 p').html("Completa correctamente todos los campos");
        $('#ex1').modal();
        return;
    }

    $.ajax('http://localhost:3000/api/users', {
            method: 'POST',
            data: elNuevoUsuario
        })
        .done(function() {
            $('#ex1 p').html("El usuario ha sido creado exitosamente!");
            $('#ex1').modal();
        })
        .fail(function() {
            $('#ex1 p').html("El usuario no ha sido creado exitosamente!");
            $('#ex1').modal();
        })
});