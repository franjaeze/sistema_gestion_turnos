import axios from 'axios'
const apiClient = axios.create({
    baseURL: 'https://64752559e607ba4797dba9c5.mockapi.io/servicios',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default{

    async listarServicios(){
        try {
            const response = await apiClient.get('/')
            return response.data
          } catch (error) {
            throw "Error de conexion"
          }
    },

    async agregarAListaServicio(elemento) {
        try {
            await apiClient.post('/', elemento);
            } catch (error) {
            throw "Error de conexion"
            }
    },

    async eliminarServicio(id) {
        try {
            await apiClient.delete("/" + id)
            } catch (error) {
            throw "Error de conexion"
            }
    },

    async modificarServicio(id, elemento) {
        try {
            await apiClient.put("/" + id, elemento)
            } catch (error) {
            throw "Error de conexion"
            }
    }
}