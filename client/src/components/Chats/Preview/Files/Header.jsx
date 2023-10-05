import React from 'react'
import { CloseIcon } from '../../../../svg'
import { useDispatch, useSelector } from 'react-redux'
import { clearfiles } from '../../../../features/chatSlice'
export default function Header({ activeIndex }) {
    const { files } = useSelector((state) => state.chat)
    const dispatch = useDispatch()
    const closeHandeler = () => {
        dispatch(clearfiles())
    }
    return (
        <div className='w-full'>
            <div className='w-full flex items-center justify-between '>
                <div className="ml-2 cursor-pointer" onClick={() => closeHandeler()}>
                    <CloseIcon className="dark:fill-dark_svg_1 " />
                </div>
                <h1 className='dark:text-dark_text_1 text-[15px]'>
                    {files[activeIndex]?.file?.name}
                </h1>
                <span></span>
            </div>
        </div>

    )
}
