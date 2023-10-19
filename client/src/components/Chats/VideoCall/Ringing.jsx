import { CloseIcon } from "../../../svg"
import ValidIcon from "../../../svg/Valid"
export default function Ringing() {
    return (
        <div className="dark:bg-dark_bg_1 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg z-30">
            <div className="p-4 flex items-center justify-between gap-x-8">
                {/* caller info */}
                <div className="flex items-center gap-x-2">
                    <img src="https://i.pinimg.com/750x/0b/c4/59/0bc459e6373181516b21b779e600c462.jpg"
                        alt={`celler profile picture`}
                        className="h-28 w-28 rounded-full" />
                    <div>
                        <h1 className="dark:text-white">
                            Kanha
                        </h1>
                        <span className="dark:text-dark_text_2">Whatsapp Video ....</span>
                    </div>
                </div>
                {/* call action */}
                <ul className="flex items-center gap-x-2">
                    <li>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500">
                            <CloseIcon className="fill-white w-5" />
                        </button>
                    </li>
                    <li>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500">
                            <ValidIcon className="fill-white w-5 h-5" />
                        </button>
                    </li>

                </ul>
            </div>
        </div>
    )
}
