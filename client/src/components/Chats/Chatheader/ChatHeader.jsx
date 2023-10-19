import React from 'react'
import { useSelector } from 'react-redux'
import { DotsIcon, SearchLargeIcon } from '../../../svg'
import { Capitalize } from '../../../utils/strings'
import { getConvoName, getConvoPicture } from '../../../utils/getUserId'
export default function ChatHeader({ online }) {
    const { activeConversation } = useSelector((state) => state.chat)
    const { user } = useSelector((state) => state.user)
    const { name } = activeConversation

    return (
        <div className='h-[30px] dark:bg-dark_bg_2 flex items-center select-none p-8 '>
            <div className='w-full flex items-center justify-between'>
                <div className='flex items-center gap-x-4 '>
                    <button className='btn'>
                        <img src={getConvoPicture(user, activeConversation.users)} alt={`${name}'s`}
                            className='w-full h-full rounded-full object-cover'
                        />
                    </button>
                    <div className='flex flex-col'>
                        <h1 className='dark:text-white text-md font-bold'>
                            {Capitalize(getConvoName(user, activeConversation.users))}
                        </h1>
                        <span className='text-xs dark:text-dark_svg_2'>{online ? "Online" : "Ofline"}</span>
                    </div>
                </div>
                <ul className='flex items-center gap-x-2.5'>
                    <li>
                        <button className='btn'>
                            <SearchLargeIcon className="dark:fill-dark_svg_1" />
                        </button>
                    </li>
                    <li>
                        <button className='btn'>
                            <DotsIcon className="dark:fill-dark_svg_1" />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
