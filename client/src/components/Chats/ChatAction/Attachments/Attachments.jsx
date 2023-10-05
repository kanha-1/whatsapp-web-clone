import React from 'react'
import { AttachmentIcon } from '../../../../svg'
import AttachmentsMenu from './Menu/AttachmentsMenu'

export default function Attachments({ showAttach, setShowAttach, setShowPicker }) {
    return (
        <li className='relative'>
            <button
                onClick={() => {
                    setShowAttach((prev) => !prev)
                    setShowPicker(false)
                }}
                type='button' className='btn'>
                <AttachmentIcon className="dark:fill-dark_svg_1 " />
            </button>
            {showAttach ? <AttachmentsMenu /> : null}
        </li>
    )
}
