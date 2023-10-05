import React from 'react'
import { BeatLoader } from "react-spinners"

export default function TypingAnim() {
    return (
        <div className={'w-full flex mt-2 space-x-2 max-w-xs'}>
            <div>
                <div className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg dark:bg-dark_bg_2`}>
                    <BeatLoader size="10" color='#fff' />
                </div>
            </div>
        </div>
    )
}
