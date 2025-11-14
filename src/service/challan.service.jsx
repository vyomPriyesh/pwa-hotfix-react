import serverCall from "../serverCall";

const getAllChallan = (page, limit, search) => {
    const payload = {
        page: page,
        limit: limit,
        search: search
    }

    try {
        const response = serverCall.post('/challan/all', payload)
        return response
    } catch (error) {
        throw error
    }
}

const allIN = () => {
    try {
        const response = serverCall.get('/challan/allIN')
        return response
    } catch (error) {
        throw error
    }
}

const handleGetJobNumber = () => {
    try {
        const response = serverCall.get('/challan/job-number')
        return response
    } catch (error) {
        throw error
    }
}

const handleSingleChallan = (id) => {
    try {
        const response = serverCall.get(`/challan/single/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

const challanservice = {
    getAllChallan, allIN, handleGetJobNumber, handleSingleChallan
}

export default challanservice
