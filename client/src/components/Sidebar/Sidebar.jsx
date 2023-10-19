import React, { useState } from 'react'
import { Sidebarheader } from './SidebarHeader'
import { Notification } from './Notification'
import { SearchBar, Searchresult } from './SearchBar'
import { Conversation } from './Conversation'
function Sidebar({onlineUsers}) {
    const [searchData, setSearchData] = useState([])
    return (
        <div className='flex0030 max-w-[40%] h-full select-none '>
            {/* header */}
            <Sidebarheader />
            {/* notification */}
            <Notification />
            {/* searchbar */}
            <SearchBar setSearchData={setSearchData} searchDataLength={searchData.length} />
            {/* Conversation */}
            {searchData.length > 0 ? (
                <>
                    <Searchresult searchData={searchData} setSearchData={setSearchData}  />
                </>
            ) : (
                <>
                    <Conversation onlineUsers={onlineUsers} />
                </>
            )}
        </div>
    )
}

export default Sidebar