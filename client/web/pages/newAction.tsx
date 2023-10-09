import Background from '../components/wrappers/Background'
import { useRouter } from 'next/router';

const NewAction = () => {
    const router = useRouter()

    const services = router.query.services ? JSON.parse(router.query.services as string) : [];
    console.log(services)

    const actionName = router.query.name ? router.query.name : "";
    console.log(actionName)

    return (
        <Background className="p-5 text-2xl font-bold">
            <div className="bg-white p-5 rounded-2xl">
                {actionName}
            </div>
        </Background>
    )
}

export default NewAction
