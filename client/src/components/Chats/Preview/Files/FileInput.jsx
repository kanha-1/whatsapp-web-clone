import React from 'react'

export default function FileInput({ fileMessage, setFileMessage }) {
  return (
    <div className='w-full max-w-[60%] dark:bg-dark_hover_1 rounded-lg '>
      <input type="text"
        placeholder='Type a message'
        onChange={(e) => setFileMessage(e.target.value)}
        value={fileMessage}
        className='w-full bg-transparent h-11 p-3 focus:outline-none border-none dark:text-dark_text_1 '
      />
    </div>
  )
}
