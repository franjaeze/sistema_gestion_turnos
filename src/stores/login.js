import { defineStore } from 'pinia'


export const useLoginStore = defineStore('login', {
    state: () => {
        return { isLogin: false, 
                 isAdmin:false,
                 user: {nombre:'',
                  dni:'', 
                  rol: '',
                  permissions:[]} }
    },
    actions: {
        logout() {
            this.isLogin = false
            this.isAdmin=false
            this.user = {nombre:'', dni:'',rol: '', permissions:[]}
        },
        login(user) {

            this.isLogin = true
            this.user = user
            if (user.dni === "12345678") {
                this.isAdmin = true
                this.user.rol = 'admin';
              } else {
                this.user.rol = 'normal';
              }
            
        },
        hasPermissions(access) {
            //console.log(this.user.permissions.filter(p => p==access).length > 0);
            return this.user.permissions.filter(p => p==access).length > 0;
        }
    },
})