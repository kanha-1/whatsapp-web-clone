import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddMoreFiles from './AddMoreFiles'
import { ClipLoader } from "react-spinners"
import { CloseIcon, SendIcon } from '../../../../svg'
import { uploadFiles } from '../../../../utils/uploadFiles'
import { useDispatch } from 'react-redux'
import { clearfiles, removeFileThumb, sendMessages } from '../../../../features/chatSlice'
import SocketContext from '../../../../context/SocketContext'
import VideoThumbnail from 'react-video-thumbnail';

function HandelAndSend({ activeIndex, iconss, setActiveIndex, fileMessage, socket }) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { files, activeConversation } = useSelector((state) => state.chat)
    const { user } = useSelector((state) => state.user)
    const sendAttachMent = async (e) => {
        setLoading(true)
        e.preventDefault()
        const newFilesFromCould = await uploadFiles(files)
        const reqBody = {
            token: user.token,
            message: fileMessage,
            convo_id: activeConversation._id,
            files: newFilesFromCould.length > 0 ? newFilesFromCould : []
        }
        let messagesWithFiles = await dispatch(sendMessages(reqBody))
        socket.emit("send message", messagesWithFiles.payload)
        setLoading(false)
        dispatch(clearfiles())
    }
    const removeFile = (index) => {
        dispatch(removeFileThumb(index))
    }
    return (
        <div className='w-[97%] flex items-center justify-between mt-2 border-t dark:border-dark_border_2'>
            <span></span>
            <div className='flex gap-x-2'>
                {files && files.map((file, index) => {
                    return (
                        <div key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`fileThumb relative w-14 h-14 border dark:border-white rounded-md overflow-hidden cursor-pointer
                            ${activeIndex === index ? "border-[3px] !border-green_1" : ""}
                            `}>
                            {file.type === "IMAGE" ?
                                <img src={file.fileData} className='w-full h-full object-contain' alt={file.fileName} /> :
                                file.type === "VIDEO" ?
                                    <VideoThumbnail
                                        videoUrl={file.fileData}
                                    />
                                    :
                                    <img src={iconss[file?.type]} alt={files?.type} />}
                            <div className='removeIcon hidden'
                                onClick={() => removeFile(index)}>
                                <CloseIcon className="dark:fill-white absolute right-0 top-0 w-5 h-4" />
                            </div>
                        </div>
                    )
                })}
                <AddMoreFiles setActiveIndex={setActiveIndex} />
            </div>
            <div
                onClick={(e) => sendAttachMent(e)}
                className='bg-green_1 w-16 h-16 mt-2 rounded-full flex items-center justify-center cursor-pointer'>
                {loading && loading ?
                    <ClipLoader size={25} color="#E9EDFF" />
                    : <SendIcon className="dark:fill-dark_svg_1 " />
                }
            </div>
        </div>
    )
}

const SocketHandelAndSend = (props) => {
    return (
        <SocketContext.Consumer>
            {(socket) => <HandelAndSend {...props} socket={socket} />}
        </SocketContext.Consumer>
    )
}

export default SocketHandelAndSend;