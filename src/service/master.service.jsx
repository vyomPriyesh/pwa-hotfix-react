import serverCall from "../serverCall";

// category master api function
const getCategoryList = () => {
    try {
        const response = serverCall.post('/ctg/all')
        return response
    } catch (error) {
        throw error
    }
}

const addCategory = (payload) => {
    try {
        const response = serverCall.post('/ctg/add', payload)
        return response
    } catch (error) {
        throw error
    }
}

const updateCategory = (id, payload) => {
    try {
        const response = serverCall.post(`/ctg/update/${id}`, payload)
        return response
    } catch (error) {
        throw error
    }
}

const deleteCategory = (id) => {
    try {
        const response = serverCall.delete(`/ctg/update/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const statusUpdateCategory = (id) => {
    try {
        const response = serverCall.post(`/ctg/update-status/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

// Party master api function
const getPartyList = (page, limit, search) => {
    const payload = {
        page: page,
        limit: limit,
        search: search
    }

    try {
        const response = serverCall.post('/party/all', payload)
        return response
    } catch (error) {
        throw error
    }
}

const addParty = (payload) => {
    try {
        const response = serverCall.post('/party/add', payload)
        return response
    } catch (error) {
        throw error
    }
}

const updateParty = (id, payload) => {
    try {
        const response = serverCall.post(`/party/update/${id}`, payload)
        return response
    } catch (error) {
        throw error
    }
}

const deleteParty = (id) => {
    try {
        const response = serverCall.delete(`/party/update/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const statusUpdateParty = (id) => {
    try {
        const response = serverCall.post(`/party/update-status/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

// all dropdown like users, category, party
const allDrodown = () => {
    try {
        const response = serverCall.get('/all-drop-down')
        return response
    } catch (error) {
        throw error
    }
}

const masterService = {
    getCategoryList, addCategory, updateCategory, deleteCategory, statusUpdateCategory,
    getPartyList, addParty, updateParty, deleteParty, statusUpdateParty,
    allDrodown
}

export default masterService