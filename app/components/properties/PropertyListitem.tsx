import Image from "next/image";

const PropertyListItem = () => {
    return (
        <div className="cursor-pointer">
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <Image fill src="/Beach-home.jpg" sizes="(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px" className="hover:scale-110 object-cover transition h-full w-full" alt="Beach house"/>
            </div>
            <div className="mt-2">
                <p className="text-lg font-bold">Property Name</p>
            </div>
            <div className="mt'2">
                <p className="text-sm text-gray-200"><strong>$200</strong> per night</p>
            </div>
        </div>
    )
}

export default PropertyListItem;