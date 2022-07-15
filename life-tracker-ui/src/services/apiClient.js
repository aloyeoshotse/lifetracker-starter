import axios from "axios"

class ApiClient {

    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = localStorage.getItem("life_tracker_token") || null
        this.tokenName = "life_tracker_token"
    }

    setToken(token) {
        this.token = token
        localStorage.setItem(this.tokenName, token)
    }

    async request({ endpoint, method = 'GET', data = {} }) {

        const url = `${this.remoteHostUrl}/${endpoint}`

        const headers = {
            "Content-Type": "application/json"
        }

        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`
        }

        try {
            const res = await axios({ url, method, data, headers })
            return { data: res.data, error: null }
        }
        catch(error) {
            console.error({ errorResponse: error.response })
            const message = error?.response
            return { data: null, error: message || String(error) }
        }
    }

    async fetchUserFromToken() {
        return await this.request({ endpoint: `auth/profile`, method: `GET` })
    }

    async loginUser(credentials) {
        return await this.request({ endpoint: `auth/login`, method: `POST`, data: credentials })
    }

    async registerUser(credentials) {
        return await this.request({ endpoint: `auth/register`, method: `POST`, data: credentials })
    }

    async listUserNutritionEntries() {
        return await this.request({ endpoint: `nutrition`, method: `GET` })
    }

    async createUserNutritionEntry(object) {
        return await this.request({ endpoint: `nutrition`, method: `POST`, data: object })
    }

    async listUserExerciseEntries() {
        return await this.request({ endpoint: `exercises`, method: `GET` })
    }

    async createUserExerciseEntry(object) {
        return await this.request({ endpoint: `exercises`, method: `POST`, data: object })
    }

    async listUserSleepEntries() {
        return await this.request({ endpoint: `sleep`, method: `GET` })
    }

    async createUserSleepEntry(object) {
        return await this.request({ endpoint: `sleep`, method: `POST`, data: object })
    }

    async getUserFeedData() {
        return await this.request({ endpoint: `auth/feed`, method: `GET` })
    }
}

// export default new ApiClient('https://lifetracker-aoshotse.herokuapp.com/')
export default new ApiClient('http://localhost:3001')