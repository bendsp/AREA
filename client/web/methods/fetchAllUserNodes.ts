const fetchAllUserNodes = async (subId: string) => {
    const url = `http://localhost:8080/client/all-nodes/${subId}`

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
