import React, { useState } from 'react'
import { useSelector } from "react-redux"
import Menu from './Menu'
import { ChatIcon, CommunityIcon, DotsIcon, StoryIcon } from "../../../svg"
function Sidebarheader() {
    const { user } = useSelector((state) => state.user)
    const [showMenu, setShowMenu] = useState(false)
    return (
        <div className='h-[60px] dark:bg-dark_bg_2 flex items-center p16'>
            {/* container */}
            <div className="w-full flex items-center justify-between">
                {/* user image */}
                <button className='btn'>
                    <img src={user?.picture} alt={`${user?.name} profile pic`}
                        className='w-full h-full rounded-full object-cover'
                    />
                </button>
                <ul className='flex items-center gap-x-2'>
                    <li>
                        <button className='btn' >
                            <CommunityIcon className="dark:fill-dark_svg_1" />
                        </button>
                    </li>
                    <li>
                        <button className='btn' >
                            <StoryIcon className="dark:fill-dark_svg_1" />
                        </button>
                    </li>
                    <li>
                        <button className='btn' >
                            <ChatIcon className="dark:fill-dark_svg_1" />
                        </button>
                    </li>
                    <li className='relative' onClick={() => setShowMenu(!showMenu)}>
                        <button className='btn' >
                            <DotsIcon className="dark:fill-dark_svg_1" />
                        </button>
                        {showMenu ? <Menu /> : null}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebarheader