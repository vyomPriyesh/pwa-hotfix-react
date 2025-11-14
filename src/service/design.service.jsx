import serverCall from "../serverCall";

const addDesign = (payload) => {
    try {
        const response = serverCall.post('/design/add', payload)
        return response
    } catch (error) {
        throw error
    }
}
const updateDesign = (id, payload) => {
    try {
        const response = serverCall.post(`/design/update/${id}`, payload)
        return response
    } catch (error) {
        throw error
    }
}
const deleteDesign = (id) => {
    try {
        const response = serverCall.delete(`/design/delete/${id}`)
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
        const response = serverCall.post('/design/all', payload)
        return response
    } catch (error) {
        throw error
    }
}

const designService = {
    getDesignList, addDesign, updateDesign, deleteDesign
}

export default designService