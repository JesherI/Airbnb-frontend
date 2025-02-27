'use client';
import CustomButton from "../forms/CustomButton";

const ConversationDetail = () => {
    return (
        <>
            <div className="max-h-[400px] overflow-auto flex flex-col space-y-4">
                <div className="w-[80%] py-4 px-6 rounded-xl bg-teal-600">
                    <p className="font-bold text-white">John Doe</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae maxime illum corporis quis exercitationem? Tempora deserunt, minima nisi expedita aperiam quam ipsam perferendis, facere tenetur dolor amet laborum ipsa aliquam!</p>
                </div>

                <div className="w-[80%] ml-[20%] py-4 px-6 rounded-xl bg-teal-800">
                    <p className="font-bold text-white">John Doe</p>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae maxime illum corporis quis exercitationem? Tempora deserunt, minima nisi expedita aperiam quam ipsam perferendis, facere tenetur dolor amet laborum ipsa aliquam!</p>
                </div>
            </div>

            <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl decoration">
                <input type="text" placeholder="Type your message..." className="w-full p-2 bg-black rounded-xl"/>
                <CustomButton label='Send' onclick={() => console.log('Clicked')} className="w-[100px]" />
            </div>
        </>
    )
}

export default ConversationDetail;