const isNewUser = async (subId: string) => {
    console.log('subId: ', subId);

    const url = `http://localhost:8080/client/user/${subId}`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await response.json()

    console.log('isNewUser reponse: ', data);

    if (data.user_id !== "0")
        return true
    return false
}

export default isNewUser
