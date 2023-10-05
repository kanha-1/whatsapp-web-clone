import React from 'react'
import { useSelector } from 'react-redux'
import Chats from './Chats'
import { checkOnlineStatus } from '../../../utils/getUserId'
import _range from 'lodash/range';

function Conversation({ onlineUsers }) {
    const { conversation, activeConversation } = useSelector((state) => state.chat)
    const { user } = useSelector((state) => state.user)
    return (
        <div className='convos scrollbar'>
            <ul>
                {conversation.length > 0 ?
                    <>
                        {conversation && conversation
                            .filter((con) => con.recentMessage || con._id === activeConversation._id)
                            .map((chats, index) => {
                                let status = checkOnlineStatus(onlineUsers, user, chats.users)
                                return (
                                    <Chats chats={chats} key={chats._id} status={status ? true : false} />
                                )
                            }
                            )}
                    </>
                    :
                    <>
                        {_range(8).map((index) => (
                        <div key={index} class=" h-[72px] px-[10px] flex items-center justify-between">
                            <div className='flex items-center' >
                                <svg class="w-12 h-12 text-gray-200 dark:text-gray-700 mr-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                </svg>
                                <div>
                                    <div class="h-4 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                    <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                                </div>
                            </div>
                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                        </div>
                        ))}
                    </>
                }
            </ul>
        </div>
    )
}

export default Conversation