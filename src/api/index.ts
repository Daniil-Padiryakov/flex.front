import axios from 'axios'
import { IAuth } from '../domain/IAuth'

export const API_URL = 'http://localhost:5010/'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        const originalRequest = error.config
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true
            try {
                const response = await axios.get<IAuth>(`${API_URL}auth/refresh`, {
                    withCredentials: true,
                })
                localStorage.setItem('token', response.data.tokens.accessToken)
                return $api.request(originalRequest)
            } catch (e) {
                console.log('НЕ АВТОРИЗОВАН')
            }
        }
        throw error
    },
)

export default $api
