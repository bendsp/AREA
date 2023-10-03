import ActionsCard from "./ActionsCard";

const ActionsContainer = () => {
    return (
        <div className="bg-yellow-500 rounded-xl p-5">
            <h2 className="text-2xl mb-4 font-bold">Actions Container</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ActionsCard />
                <ActionsCard />
                <ActionsCard />
                <ActionsCard />
                <ActionsCard />
                <ActionsCard />
            </div>
        </div>
    )
}

export default ActionsContainer;
