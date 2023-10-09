import ActionsCard from "./ActionsCard";
import NewActionButton from "./NewActionButton";

import { ServicesProps } from "../../../interfaces/services";

interface ActionsContainerProps {
    services: Array<ServicesProps>;
}

const ActionsContainer = ({ services }: ActionsContainerProps) => {
    return (
        <div className="bg-[#1e1e1e] rounded-xl p-5 space-y-3">
            <h2 className="text-2xl mb-4 font-bold">Actions Container</h2>
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
