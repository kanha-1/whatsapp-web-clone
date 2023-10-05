import React from 'react'
import { useSelector } from 'react-redux'
import { bytesToKB } from "../../../../utils/bytesConverter"
export default function Viewer({ iconss, activeIndex }) {
    const { files } = useSelector((state) => state.chat)
    return (
        <div className='w-full max-w-[60%]'>
            <div className='flex justify-center items-center'>
                {files[activeIndex].type === "IMAGE" ?
                    <img src={files[activeIndex]?.fileData} alt={files[activeIndex]?.file?.name}
                        className='max-w-[80%] object-contain hview'
                    />
                    : files[activeIndex].type === "VIDEO" ?
                        <video className='max-w-[80%] object-contain hview' src={files[activeIndex]?.fileData} controls></video>
                        :
                        <div className='min-w-full hview flex flex-col items-center justify-center'>
                            <img src={iconss[files[activeIndex]?.type]} alt={files[activeIndex]?.type} />
                            <h1 className='dark:text-dark_text_2 text-2xl'>No Preview Available</h1>
                            <span className='dark:text-dark_text_2 '>
                                {bytesToKB(files[activeIndex]?.file?.size)} - {files[activeIndex]?.type}
                            </span>
                        </div>
                }
            </div>
        </div>
    )
}

