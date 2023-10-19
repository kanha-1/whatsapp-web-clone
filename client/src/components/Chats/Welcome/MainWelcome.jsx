import React from 'react'
import { Logo } from '../../../svg'

export default function MainWelcome() {
    return (
        <div className='h-full w-full dark:bg-dark_bg_4 select-none border-l dark:border-l-dark_border_2   border-b-[6px] border-b-green_2 '>
            {/* cont */}
            <div className='-mt-5 w-full h-full flex flex-col gap-y-8 items-center justify-center'>
                <span>
                    <Logo />
                </span>
                <div className="mt-1 text-center space-y-[12px]">
                    <h1 className='text-[32px] dark:text-dark_text_4 font-extralight'>
                        Whatsapp Web
                    </h1>
                    <p className='text-sm dark:text-dark_text_4'>
                        Send and receive messages without keeping your phone online.
                        <br />
                        Use whatsapp on upto 4 linked device and 1 phone at the same time
                    </p>
                </div>
            </div>
        </div>
    )
}
