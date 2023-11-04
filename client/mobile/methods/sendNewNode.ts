import { NodeProps } from "../interfaces/nodes"

const sendNewNode = async (node: NodeProps) => {
    const response = await fetch('http://127.0.0.1:8080/client/new-node', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(node)
    });

    const data = await response.json();

    console.log('node', node);
}

export default sendNewNode
