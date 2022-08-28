import axios from 'axios'

axios.defaults.withCredentials = true

axios.interceptors.response.use((response)=>{
    console.log(response)
}, (error)=>{
    console.log(error)
})

export default axios