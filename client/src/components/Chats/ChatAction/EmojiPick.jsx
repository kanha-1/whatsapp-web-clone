import React, { useState, useEffect } from 'react'
import { CloseIcon, EmojiIcon } from '../../../svg'
import EmojiPicker from 'emoji-picker-react';

export default function EmojiPick({ message, setMessages, textRef, showPicker, setShowPicker, setShowAttach }) {
    // const [showPicker, setSHowPicker] = useState(false)
    const [cursorPosition, setcursorPosition] = useState()
    useEffect(() => {
        textRef.current.selectedEnd = cursorPosition;
    }, [cursorPosition])
    const handelEmojiCLick = (emojiData, e) => {
        const { emoji } = emojiData
        const ref = textRef.current
        ref.focus()
        const start = message.substring(0, ref.selectionStart)
        const end = message.substring(ref.selectionStart)
        const newText = start + emoji + end 
        setMessages(newText)
        setcursorPosition(start.length + emoji.length)
    }

    return (
        <li>
            <button onClick={() => {
                setShowAttach(false)
                setShowPicker(!showPicker)
            }} className='btn' type='button'>
                {showPicker ?
                    <CloseIcon className="dark:fill-dark_svg_1 " /> :
                    <EmojiIcon className="dark:fill-dark_svg_1 " />
                }
            </button>
            {showPicker && (
                <div className='openAnimationEmoji absolute bottom-[60px] left-[-0.5px] w-full'>
                    <EmojiPicker emojiStyle="facebook" onEmojiClick={handelEmojiCLick} theme='dark' />
                </div>
            )}

        </li>
    )
}
