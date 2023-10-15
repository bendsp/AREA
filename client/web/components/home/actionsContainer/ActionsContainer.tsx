import ActionsCard from "./ActionsCard";
import NewActionButton from "./NewActionButton";

import { ServicesProps } from "../../../interfaces/services";

interface ActionsContainerProps {
    services: Array<ServicesProps>;
}

const ActionsContainer = ({ services }: ActionsContainerProps) => {
    // TODO: get actions from server
    return (
        <div className="bg-[#1e1e1e] rounded-xl p-5 space-y-3">
            <div className="bg-yellow-500 w-fit rounded-xl px-2 text-xl font-bold text-[#1e1e1e]">
                ACTION CONTAINER
            </div>
            <ActionsCard />
            <ActionsCard />
            <ActionsCard />
            <ActionsCard />
            <ActionsCard />
            <ActionsCard />
            <NewActionButton services={services}/>
        </div>
    )
}

export default ActionsContainer;
