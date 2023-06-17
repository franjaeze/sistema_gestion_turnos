import axios from 'axios'
const apiClient = axios.create({
    baseURL: 'https://646be9cc7b42c06c3b2a91cd.mockapi.io/empleados',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default{

    async listarEmpleados(){
        try {
            const response = await apiClient.get('/')
            return response.data
          } catch (error) {
            throw "Error de conexion"
          }
    },

    async agregarAListaEmpleados(elemento) {
        try {
            await apiClient.post('/', elemento);
            } catch (error) {
            throw "Error de conexion"
            }
    },

    async eliminarEmpleado(id) {
        try {
            await apiClient.delete("/" + id)
            } catch (error) {
            throw "Error de conexion"
            }
    },

    async modificarEmpleado(id, elemento) {
        try {
            await apiClient.put("/" + id, elemento)
            } catch (error) {
            throw "Error de conexion"
            }
    }
}