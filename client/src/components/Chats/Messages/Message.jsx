import React from 'react'
import moment from "moment"
import TriangleIcon from "../../../svg/triangle"
export default function Message({ message, myMessage }) {

  return (
    <div className={`w-full flex mt-2 space-x-2 max-w-xs break-all ${myMessage ? "ml-auto justify-end" : ""} `}>
      <div>
        <div className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg ${myMessage ? "bg-green_3" : "dark:bg-dark_bg_2"}`}>
          {/* messages */}
          <p className='float-left h-full text-sm pb-5 pr-8'>{message.message}</p>
          {/* dates */}
          {/* <span className='float-right text-xs pt-6 text-dark_text_5'> */}
          <span className="absolute right-1.5 bottom-1.5 text-xs text-dark_text_5 leading-none">
            {moment(message.createdAt).format("HH:mm")}
          </span>
          <span>
            {!myMessage ?
              <TriangleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5" />
              : null}
          </span>
        </div>
      </div>
    </div>
  )
}
