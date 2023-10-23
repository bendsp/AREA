import { UserProfile } from "@auth0/nextjs-auth0/client";

const addNewUser = async (user: UserProfile) => {
    console.log('user: ', user);

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

    console.log('addNewUser data: ', data);

    return data
}

export default addNewUser
