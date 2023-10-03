import ServicesCard from "./ServicesCard";

const ServicesContainer = () => {
    return (
        <div className="bg-green-500 rounded-xl p-5">
            <h2 className="text-2xl mb-4 font-bold">Services Container</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ServicesCard />
                <ServicesCard />
                <ServicesCard />
                <ServicesCard />
                <ServicesCard />
                <ServicesCard />
            </div>
        </div>
    )
}

export default ServicesContainer;
