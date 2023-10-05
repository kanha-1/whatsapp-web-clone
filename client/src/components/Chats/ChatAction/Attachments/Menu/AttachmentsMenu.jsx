import React from 'react'
import { CameraIcon, ContactIcon, PollIcon, StickerIcon } from '../../../../../svg'
import AttachPhoto from './AttachPhoto'
import AttachDocx from './AttachDocx'

export default function AttachmentsMenu() {
  return (
    <div className='absolute bottom-14 openAnimationEmoji'>
      <li>
        <button type='button' className='rounded-full'>
          <PollIcon />
        </button>
      </li>
      <li>
        <button type='button' className='rounded-full bg-[#0EABF4]'>
          <ContactIcon />
        </button>
      </li>
      <AttachDocx />
      <li>
        <button type='button' className='rounded-full bg-[#D3396D]'>
          <CameraIcon />
        </button>
      </li>
      <li>
        <button type='button' className='rounded-full'>
          <StickerIcon />
        </button>
      </li>
      <AttachPhoto />
    </div>
  )
}
