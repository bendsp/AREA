// interface DeleteNodeProps {
//     userId: string
//     areaId: string
// }

const deleteNode = async (userId: string, areaId: string) => {
    const url = 'http://localhost:3000/client/delete-node'

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
