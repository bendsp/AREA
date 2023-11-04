const sendGitHubCode = async (code: string, userId: string) => {
    const url = "http://localhost:8080/github/callback"

    const body = {
        code,
        userId,
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })

    const data = await response.json()

    return data
}

export default sendGitHubCode
