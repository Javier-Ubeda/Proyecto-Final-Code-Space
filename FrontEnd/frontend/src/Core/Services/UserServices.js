import axios from "axios";


export const registerUser = async (form) => {
    const res = await axios.post('http://localhost:4000/api/auth/signup', form)
    return res.data
}

export const loginUser = async (form) => {
    const res = await axios.post('http://localhost:4000/api/auth/login', {
        email: form.email,
        password: form.password
    })

    const {token, user} = res.data
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))

        return user
}

export const logoutUser = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}

export const isAuthenticated = () => {
    const token = localStorage.getItem('token')
    return !!token
}

