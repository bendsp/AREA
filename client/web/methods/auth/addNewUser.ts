import { UserProfile } from "@auth0/nextjs-auth0/client";

const addNewUser = async (user: UserProfile) => {
    const body = {
        email: user.email,
        username: user.nickname,
        user_id: user.sub,
    }

    const response = await fetch('http://localhost:8080/client/new-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    const data = await response.json()

    return data
}

export default addNewUser
