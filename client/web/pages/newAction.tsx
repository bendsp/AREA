import Background from '../components/wrappers/Background'
import { useRouter } from 'next/router';
import TriggerCard from '../components/newAction/TriggerCard';
import NewReactionButton from '../components/newAction/NewReactionButton';
import ReactionCard from '../components/newAction/ReactionCard';
import { useState } from 'react';
import { ReactionCardData } from '../interfaces/reactions';

const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

const NewAction = () => {
    const router = useRouter()

    const services = router.query.services ? JSON.parse(router.query.services as string) : [];
    console.log(services)

    const actionName = router.query.name ? router.query.name : "";
    console.log(actionName)

    const [reactionCardsData, setReactionCardsData] = useState<Array<ReactionCardData>>([]);

    const removeReactionCard = (id: string) => {
        setReactionCardsData(prevState => prevState.filter(card => card.id !== id));
    };

    const addReactionCard = () => {
        setReactionCardsData(prevState => [...prevState, { id: generateId(), service: '', reaction: '', paramValues: [] }]);
    };

    const handleUpdateReactionCard = (reactionCard: ReactionCardData) => {
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

    return (
        <Background className="p-5 text-2xl font-bold space-y-5">
            <div className="bg-[#ffffff] p-5 rounded-2xl">
                {actionName}
            </div>
            {/* // TODO: add onUpdate for TriggerCard */}
            <TriggerCard services={services} />
            {reactionCardsData.map(cardData => (
                <ReactionCard
                    key={cardData.id}
                    data={cardData}
                    services={services}
                    onDelete={removeReactionCard}
                    onUpdate={handleUpdateReactionCard}
                />
            ))}
            <NewReactionButton onClick={addReactionCard}/>
            {/* // TODO: add cancel & save buttons */}
            </Background>
    )
}

export default NewAction
