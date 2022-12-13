
// FUNCION QUE OBTIENE EL TOKEN DEL USUARIO.
export const ObtenerToken = () => {

    // CONVERTIR LOS DATOS DEL LOCAL-STORAGE EN JSON.
    let user = JSON.parse(localStorage.getItem('Usuario')!);

    // RETORNANDO EL TOKEN.
    return user.token;

}