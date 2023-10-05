import React, { useState } from 'react'
import { FilterIcon, ReturnIcon, SearchIcon, CloseIcon } from '../../../svg'
import axios from 'axios'
import { useSelector } from 'react-redux'
function SearchBar({ searchDataLength, setSearchData }) {

    const [show, setShow] = useState(false)
    const { user } = useSelector((state) => ({ ...state.user }))
    const access_token = user?.token

    const handleSearch = async (e) => {
        if (e.target.value && e.key === "Enter") {
            try {
                const { data } = await axios.get(` http://localhost:8080/api/users?search=${e.target.value}`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                setSearchData(data)
            } catch (error) {
                console.log(error);
            }
        } else {
            setSearchData([])
        }
    }

    return (
        <div className='h-[49px] py-1.5'>
            <div className="px-[10px]">
                <div className='flex items-center gap-x-2'>
                    <div className='w-full flex dark:bg-dark_bg_2 rounded-lg pl-2'>
                        {show || searchDataLength > 0 ?
                            <span className='w-8 flex items-center justify-center rotateAnimation cursor-pointer'
                                onClick={() => setSearchData([])}>
                                <ReturnIcon className="fill-green_1 w-5" />
                            </span>
                            :
                            <span className='w-8 flex items-center justify-center'>
                                <SearchIcon className="dark:fill-dark_svg_2 w-5" />
                            </span>
                        }
                        <input type="text"
                            placeholder='Search or start a new chat'
                            className='input'
                            onFocus={() => setShow(true)}
                            onBlur={() => searchDataLength === 0 && setShow(false)}
                            onKeyDown={(e) => handleSearch(e)}
                        />
                        {show || searchDataLength > 0 ?
                            <div className='w-8 flex items-center justify-center cursor-pointer'>
                                <CloseIcon className="dark:fill-dark_svg_2" />
                            </div>
                            : ""}
                    </div>
                    <button className="btn">
                        <FilterIcon className="dark:fill-dark_svg_2" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SearchBar