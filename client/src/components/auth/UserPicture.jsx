import React, { useRef, useState } from 'react'
function UserPicture({ setImagePreview, imagePreview, setPicture }) {
    const innerRef = useRef()
    const [err, setErr] = useState('')
    const handelPictureUpload = (e) => {
        let pic = e.target.files[0]
        if (pic.type !== "image/png" && pic.type !== "image/jpeg" && pic.type !== "image/webp") {
            setErr(`${pic.name} file is not suppoted , use only jpeg, webp or png`)
            return
        } else if (pic.size > 1024 * 1024 * 5) {
            setErr(`${pic.name} file is too large, please upload below 5 MB`)
            return
        } else {
            setErr('')
            setPicture(pic)
            const showPicture = new FileReader()
            showPicture.readAsDataURL(pic)
            showPicture.onload = (e) => {
                setImagePreview(e.target.result)
            }
        }
    }

    const handelPictureChange = () => {
        setImagePreview('')
        setPicture('')
    }
    return (
        <div className='mt-8 content-center dark:text-dark_text_1 space-y-1'>
            <label htmlFor="picture" className='text-sm font-bold tracking-wide'>
                Picture(optional)
            </label>
            {imagePreview ?
                <div className='flex justify-center'>
                    <img src={imagePreview} alt="profile user"
                        className='w-20 h-20 object-cover rounded-full' />
                    <div onClick={() => handelPictureChange()}
                        className='ml-2 mt-5 w-20 h-10 dark:bg-dark_bg_3 rounded-md text-sm flex items-center justify-center cursor-pointer'>
                        Remove
                    </div>
                </div>
                :
                <div
                    onClick={() => innerRef.current.click()}
                    className='w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer'>
                    Upload Picture
                </div>
            }
            <input type="file" name="userPicture"
                accept='image/png,image/jpeg,image/webp'
                id="userPicture" hidden ref={innerRef}
                onChange={handelPictureUpload}
            />
            <div className='mt-2'>
                <p className="text-red-400">
                    {err}
                </p>
            </div>
        </div>
    )
}

export default UserPicture