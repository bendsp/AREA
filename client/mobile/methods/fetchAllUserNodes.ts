const fetchAllUserNodes = async (subId: string) => {
    const url = `http://localhost:8080/client/all-nodes/${subId}` //google-oauth2|114479912414647541183

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await response.json()
    return data
}

export default fetchAllUserNodes
