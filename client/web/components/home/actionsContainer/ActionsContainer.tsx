import ActionsCard from "./ActionsCard";
import NewActionButton from "./NewActionButton";
import fetchAllUserNodes from "../../../methods/fetchAllUserNodes";

import { ServicesProps } from "../../../interfaces/services";
import { User } from "../../../interfaces/user";
import { NodeProps } from "../../../interfaces/nodes";
import { useState, useEffect } from "react";

interface ActionsContainerProps {
    services: Array<ServicesProps>;
    user: User
}

const ActionsContainer = ({ services, user }: ActionsContainerProps) => {
    const [userNodes, setUserNodes] = useState([]);

    // TODO: check if behaves as expected (reload nodes after delete)
    const updateNodes = (userId: string) => {
        console.log('update user nodes: ', userId)
        fetchAllUserNodes(userId)
        .then((userNodes) => {
            setUserNodes(userNodes);
        })
    }

    useEffect(() => {
        updateNodes(user.sub);
        // fetchAllUserNodes(user.sub)
        // .then((userNodes) => {
        //     setUserNodes(userNodes);
        // })
    }, [user.sub])

    console.log('userNodes: ', userNodes)

    return (
        <div className="bg-[#1e1e1e] rounded-xl p-5 space-y-4">
            <div className="bg-yellow-500 w-fit rounded-xl px-2 text-xl font-bold text-[#1e1e1e]">
                Add your actions here!
            </div>
            <div className="space-y-4">
                {userNodes?.map((userNode: NodeProps, index) => {
                    return (
                        <div key={index}>
                            <ActionsCard userNode={userNode} userId={user.sub} updateAllNodes={updateNodes} />
                        </div>
                    )})
                }
            </div>
            <NewActionButton services={services}/>
        </div>
    )
}

export default ActionsContainer;
