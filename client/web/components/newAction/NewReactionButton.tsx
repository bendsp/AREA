interface NewReactionButtonProps {
    onClick: () => void;
}

const NewReactionCard = ({ onClick }: NewReactionButtonProps) => {
    return (
        <div
            className="border-dashed border-2 border-[#fffff] text-[#ffffff] hover:bg-[#1e1e1e] cursor-pointer rounded-xl p-5 flex justify-center"
            onClick={onClick}
        >
            Add a new Reaction
        </div>
    )
}

export default NewReactionCard
