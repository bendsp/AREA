import Background from '../components/wrappers/Background'
import { useRouter } from 'next/router';
import TriggerCard from '../components/newAction/TriggerCard';
import NewReactionButton from '../components/newAction/NewReactionButton';
import ReactionCard from '../components/newAction/ReactionCard';
import { useState } from 'react';
import { ReactionProps } from '../interfaces/reactions';
import { ActionParamsProps } from '../interfaces/actions';
import { ServicesProps } from '../interfaces/services';
import { TriggerProps } from '../interfaces/triggers';
import createNodeJson from '../methods/createNodeJson';
import sendNewNode from '../methods/sendNewNode';
import { User } from '../interfaces/user';
import { NodeProps } from '../interfaces/nodes';

const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

const NewAction = () => {
    const router = useRouter()
    const services = router.query.services ? JSON.parse(router.query.services as string) : [];
    const actionName = router.query.name ? router.query.name as string : "";

    const servicesWithActions = services.filter((service: ServicesProps) => service.actions.length > 0);

    const servicesWithReactions = services.filter((service: ServicesProps) => service.reactions.length > 0);

    // TODO: same here, default values
    const [triggerCardData, setTriggerCardData] = useState<TriggerProps>({
        service: "Time",
        action: "get_city_time",
        paramValues: [
            { name: "time", value: "" },
            { name: "city", value: "" }
        ] as Array<ActionParamsProps>
    });

    const [reactionCardsData, setReactionCardsData] = useState<Array<ReactionProps>>([]);

    const removeReactionCard = (id: string) => {
        setReactionCardsData(prevState => prevState.filter(card => card.id !== id));
    };

    // TODO: if other services don't work, its coming from here (default values)
    const addReactionCard = () => {
        setReactionCardsData(prevState => [...prevState, {
            id: generateId(),
            service: "Gmail",
            reaction: "send_email",
            paramValues: [
                { name: "email", value: "" },
                { name: "subject", value: "" },
                { name: "message", value: "" }
            ] as Array<ActionParamsProps>
        }]);
    };

    const handleUpdateTriggerCard = (triggerCard: TriggerProps) => {
        setTriggerCardData(triggerCard);
    }

    const handleUpdateReactionCard = (reactionCard: ReactionProps) => {
        setReactionCardsData((prevState) => {
            return prevState.map((card) => {
                if (card.id === reactionCard.id) {
                    return reactionCard;
                } else {
                    return card;
                }
            })
        })
    }

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) as User : null;

    const handleSaveArea = async () => {
        const nodeJson = createNodeJson((user?.sub ?? "1" ), actionName, triggerCardData, reactionCardsData)
        await sendNewNode(nodeJson as NodeProps)
        router.push('/home')
    }

    return (
        <Background className="flex flex-col p-5 text-2xl font-bold space-y-5">
            <div className="bg-[#ffffff] p-5 rounded-2xl">
                {actionName}
            </div>
            <TriggerCard
                services={servicesWithActions}
                data={triggerCardData}
                onUpdate={handleUpdateTriggerCard}
            />
            {reactionCardsData.map(cardData => (
                <ReactionCard
                    key={cardData.id}
                    data={cardData}
                    services={servicesWithReactions}
                    onDelete={removeReactionCard}
                    onUpdate={handleUpdateReactionCard}
                />
            ))}
            <NewReactionButton onClick={addReactionCard}/>
            {/* // TODO: add cancel & save buttons */}
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded w-[fit-content] self-end"
                onClick={handleSaveArea}
            >
                Save AREA
            </button>
        </Background>
    )
}

export default NewAction
