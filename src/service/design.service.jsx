import serverCall from "../serverCall";

const addDesign = (payload) => {
    try {
        const response = serverCall.post('/register', payload)
        return response
    } catch (error) {
        throw error
    }
}
const updateDesign = (id, payload) => {
    try {
        const response = serverCall.post(`/update-profile/${id}`, payload)
        return response
    } catch (error) {
        throw error 
    }
}
const deleteDesign = (id) => {
    try {
        const response = serverCall.delete(`all-users/delete/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const getDesignList = (page, limit, search) => {
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
    getDesignList, addDesign, updateDesign, deleteDesign
}

export default userService