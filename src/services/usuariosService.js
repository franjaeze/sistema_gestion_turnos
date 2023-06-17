import axios from 'axios'
const apiClient = axios.create({
    baseURL: 'https://646beae07b42c06c3b2a949b.mockapi.io/usuarios', 
                
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default{

    async listarUsuarios(){
        try {
            const response = await apiClient.get('/')
            return response.data
          } catch (error) {
            throw "Error de conexion"
          }
    },

    async agregar(elemento) {
        try {
            await apiClient.post('/', elemento);
            } catch (error) {
            throw "Error de conexion"
            }
    },

    async eliminar(id) {
        try {
            await apiClient.delete("/" + id)
            } catch (error) {
            throw "Error de conexion"
            }
    },

    async modificar(id, elemento) {
        try {
            await apiClient.put("/" + id, elemento)
            } catch (error) {
            throw "Error de conexion"
            }
    }
}