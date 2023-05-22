import { useAuthContext } from '../hooks/useAuthContext'

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const logout = () =>{
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        dispatch({type:'LOGOUT'})
    }
    return {logout}
}