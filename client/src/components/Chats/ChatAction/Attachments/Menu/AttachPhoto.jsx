import React, { useRef } from 'react'
import { PhotoIcon } from '../../../../../svg'
import { useDispatch, } from 'react-redux'
import { addfiles } from '../../../../../features/chatSlice'
import { getFileType } from '../../../../../utils/file'
export default function AttachPhoto() {
    const dispatch = useDispatch()
    const inputRef = useRef(null)
    const imageCapture = (e) => {
        let files = Array.from(e.target.files)
        files.forEach((image) => {
            if (image.type !== "image/png" && image.type !== "image/jpeg" &&
                image.type !== "image/gif" && image.type !== "image/webp" &&
                image.type !== "image/jpg" && image.type !== "video/mp4" &&
                image.type !== "video/webm" && image.type !== "video/mov" &&
                image.type !== "video/mpeg") {
                files = files.filter((item) => item.name !== image.name)
                return
            } else if (image.size > 1024 * 1024 * 10) {
                files = files.filter((item) => item.name !== image.name)
                return
            } else {
                const reader = new FileReader()
                reader.readAsDataURL(image)
                reader.onload = (e) => {
                    dispatch(
                        addfiles({ file: image, fileData: e.target.result, type: getFileType(image.type) })
                    )
                }
            }
        })
    }
    return (
        <li>
            <button type='button' className='bg-[#BF59CF] rounded-full'
                onClick={() => inputRef.current.click()}>
                <PhotoIcon />
            </button>
            <input type="file"
                hidden
                multiple
                ref={inputRef}
                onChange={imageCapture}
                accept='image/png,image/jpeg,image/webp,image/gif,image/jpg,video/mp4,video/webm,video/mov' />
        </li>
    )
}
