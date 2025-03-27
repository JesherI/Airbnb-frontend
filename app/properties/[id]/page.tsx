import Image from "next/image";
import ReservationSidebar from "../../components/properties/ReservationSidebar";

import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";

const PropertyDetailPage = async ({ params }: { params: { id: string } }) => {

    const property = await apiService.get(`/api/properties/${params.id}/`)
    const userId = await getUserId();

    console.log('userId', userId);

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
                <Image fill src="/Beach-home.jpg" className="object-cover w-full h-full" alt="Beach house" />
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="py-6 pr-6 col-span-3">
                    <h1 className="mb-4 text-4xl">Property name {property.title}</h1>
                    <span className="mb-6 block text-lg text-gray-400">
                        {property.guests} guests - {property.bedrooms} bedrooms - {property.bathrooms} bathroom
                    </span>
                    <hr />
                    <div className="py-6 flex items-center space-x-4">
                        <Image src="/profile.jpg" width={50} height={50} className="rounded-full" alt="The user name" />
                        <p><strong>{property.landlord.name} {property.landlord.avatar_url}</strong> is your host</p>
                    </div>
                    <hr />
                    <p className="mt-6 text-lg">
                        {property.description}
                    </p>
                </div>
                <ReservationSidebar 
                    property={property}
                    userId={userId}
                />
            </div>
        </main>
    )
}

export default PropertyDetailPage;