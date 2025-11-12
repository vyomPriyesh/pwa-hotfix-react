import serverCall from "../serverCall";

const addUser = (payload) => {
    try {
        const response = serverCall.post('/register', payload)
        return response
    } catch (error) {
        throw error
    }
}
const updateUser = (id, payload) => {
    try {
        const response = serverCall.post(`/update-profile/${id}`, payload)
        return response
    } catch (error) {
        throw error
    }
}
const deleteUser = (id) => {
    try {
        const response = serverCall.delete(`all-users/delete/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const getUserList = (page, limit, search) => {
    const payload = {
        page: page,
        limit: limit,
        search: search
    }

    try {
        const response = serverCall.post('/all-users', payload)
        return response
    } catch (error) {
        throw error
    }
}

const userService = {
    getUserList, addUser, updateUser, deleteUser
}

export default userService