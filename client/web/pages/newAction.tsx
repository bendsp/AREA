import Background from '../components/wrappers/Background'
import { useRouter } from 'next/router';
import TriggerCard from '../components/newAction/TriggerCard';
import NewReactionButton from '../components/newAction/NewReactionButton';
import ReactionCard from '../components/newAction/ReactionCard';
import { useState } from 'react';
import { ReactionProps } from '../interfaces/reactions';
import { ServicesProps, ActionParamsProps } from '../interfaces/services';
import { TriggerProps } from '../interfaces/triggers';

const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

const NewAction = () => {
    const router = useRouter()
    const services = router.query.services ? JSON.parse(router.query.services as string) : [];
    const actionName = router.query.name ? router.query.name : "";

    const [triggerCardData, setTriggerCardData] = useState<TriggerProps>();

    const [reactionCardsData, setReactionCardsData] = useState<Array<ReactionProps>>([]);

    const removeReactionCard = (id: string) => {
        setReactionCardsData(prevState => prevState.filter(card => card.id !== id));
    };

    // TODO: if other services doesn't work, its coming from here (default values)
    const addReactionCard = () => {
        setReactionCardsData(prevState => [...prevState, {
            id: generateId(),
            service: "Gmail",
            reaction: "send_email",
            paramValues: [
                { name: "email-destination", value: "" },
                { name: "subject", value: "" },
                { name: "body", value: "" }
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

    const handleSaveArea = () => {
        console.log('SAVING AREA');
        console.log('triggerCardData: ', triggerCardData)
        console.log('reactionCardsData: ', reactionCardsData)
    }

    const servicesWithActions = services.filter((service: ServicesProps) => service.actions.length > 0);

    const servicesWithReactions = services.filter((service: ServicesProps) => service.reactions.length > 0);

    return (
        <Background className="flex flex-col p-5 text-2xl font-bold space-y-5">
            <div className="bg-[#ffffff] p-5 rounded-2xl">
                {actionName}
            </div>
            {/* // TODO: add onUpdate for TriggerCard */}
            <TriggerCard
                services={servicesWithActions}
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
