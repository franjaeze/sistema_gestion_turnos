import axios from 'axios'
const apiClient = axios.create({
    baseURL: 'https://646beae07b42c06c3b2a949b.mockapi.io/turnos',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default{

    async listarTurnos(){
        try {
            const response = await apiClient.get('/')
            return response.data
          } catch (error) {
            throw "Error de conexion"
          }
    },
    async misTurnos(){
        try {
            const response = await apiClient.get('/')
            return response.data
          } catch (error) {
            throw "Error de conexion"
          }
    },

    async agregarALista(elemento) {
        try {
            await apiClient.post('/', elemento);
            } catch (error) {
            throw "Error de conexion"
            }
    },

    async eliminarTurno(id) {
        try {
            await apiClient.delete("/" + id)
            } catch (error) {
            throw "Error de conexion"
            }
    },

    async modificarTurno(id, elemento) {
        try {
            console.log('Entra a modificar turno service')
            await apiClient.put("/" + id, elemento)
            } catch (error) {
            throw "Error de conexion"
            }
    }
}