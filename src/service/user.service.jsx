import serverCall from "../serverCall";

const getUserList = () => {
    try {
        const response = serverCall.post('/all-users')
        return response
    } catch (error) {
        throw error
    }
}

const userService = {
    getUserList
}

export default userService