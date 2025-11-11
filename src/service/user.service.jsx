import serverCall from "../serverCall";

const getUserList = (page, limit) => {
    const payload = {
        page: page,
        limit: limit
    }

    try {
        const response = serverCall.post('/all-users', payload)
        return response
    } catch (error) {
        throw error
    }
}

const userService = {
    getUserList
}

export default userService