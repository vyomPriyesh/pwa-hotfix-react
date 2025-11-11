import serverCall from "../serverCall";

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
    getUserList
}

export default userService