import Background from '../components/wrappers/Background'
import { useRouter } from 'next/router';
import TriggerCard from '../components/newAction/TriggerCard';
import NewReactionCard from '../components/newAction/NewReactionCard';

const NewAction = () => {
    const router = useRouter()

    const services = router.query.services ? JSON.parse(router.query.services as string) : [];
    console.log(services)

    const actionName = router.query.name ? router.query.name : "";
    console.log(actionName)

    return (
        <Background className="p-5 text-2xl font-bold space-y-5">
            <div className="bg-[#ffffff] p-5 rounded-2xl">
                {actionName}
            </div>
            <TriggerCard services={services} />
            <NewReactionCard />
            {/* // TODO: add cancel & save buttons */}
        </Background>
    )
}

export default NewAction
