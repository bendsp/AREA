import { NodeProps } from "../interfaces/nodes"

const sendNewNode = async (node: NodeProps) => {
    const response = await fetch('http://10.116.120.163:8080/client/new-node', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(node)
    });

    const data = await response.json();

    console.log(data);
}

export default sendNewNode
