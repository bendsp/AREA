import ActionsCard from "./ActionsCard";
import NewActionButton from "./NewActionButton";

const ActionsContainer = () => {
    return (
        <div className="bg-yellow-500 rounded-xl p-5 space-y-3">
            <h2 className="text-2xl mb-4 font-bold">Actions Container</h2>
                <ActionsCard />
                <ActionsCard />
                <ActionsCard />
                <ActionsCard />
                <ActionsCard />
                <ActionsCard />
                <NewActionButton />
        </div>
    )
}

export default ActionsContainer;
