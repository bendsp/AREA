const deleteNode = async (userId: string, areaId: string) => {
    const url = 'http://10.116.120.163:8080/client/delete-node'

    const body = {
        user_id: userId,
        area_id: areaId,
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    })

    const result = await response.json()

    return result
}

export default deleteNode
