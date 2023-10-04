interface ServicesCardProps {
    service: {
        name: string;
        actions: Array<string>;
        reactions: Array<string>;
    };
}

const ServicesCard = ({ service }: ServicesCardProps) => {
    return (
        <div className="bg-green-700 rounded-2xl p-5 space-y-3">
            <h3 className="text-xl font-bold">{service.name}</h3>
            <div className="bg-white rounded-xl p-3">
                {/* // TODO: change to description and add logo */}
                <p className="font-bold">Actions:</p>
                <ul>
                    {service.actions.map((action) => {
                        return <li key={action} className="italic">{action}</li>
                    })}
                </ul>
            </div>
            <div className="bg-white rounded-xl p-3">
                <p className="font-bold">Reactions:</p>
                <ul>
                    {service.reactions.map((reaction) => {
                        return <li key={reaction}>{reaction}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default ServicesCard
