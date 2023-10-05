import React, { useState } from 'react'
import Header from './Header'
import Viewer from './Viewer'
import FileInput from './FileInput'
import HandelAndSend from './HandelAndSend'
import PDF from "../Images/PDF.png"
import PPTX from "../Images/PPTX.png"
import TXT from "../Images/TXT.png"
import DOCX from "../Images/DOCX.png"
export default function FilePreview() {
    const [fileMessage, setFileMessage] = useState('')
    const [activeIndex, setActiveIndex] = useState(0)
    const icons = {
        PDF: PDF,
        PPTX: PPTX,
        TXT: TXT,
        DOCX: DOCX,
    };
    return (
        <div className='relative py-2 w-full flex items-center justify-center'>
            <div className="w-full flex flex-col items-center">
                <Header activeIndex={activeIndex} />
                {/* selected file to be view */}
                <Viewer iconss={icons} activeIndex={activeIndex} />
                <div className='w-full flex flex-col items-center'>
                    <FileInput fileMessage={fileMessage} setFileMessage={setFileMessage} />
                    <HandelAndSend
                        fileMessage={fileMessage}
                        iconss={icons}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex} />
                </div>
            </div>
        </div>
    )
}
