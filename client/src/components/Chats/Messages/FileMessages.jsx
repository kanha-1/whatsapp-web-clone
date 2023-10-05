import moment from "moment"
import FileImageVideo from "./FileImageVideo"
import OtherFiles from "./OtherFiles"
import TriangleIcon from "../../../svg/triangle"
export default function FileMessages(
    {
        message,
        key,
        fileMessages,
        currentUser
    }
) {
    const { file, type } = fileMessages
    return (
        <div className={`w-full flex mt-2 space-x-2 max-w-xs
         ${currentUser ? "ml-auto justify-end" : ""} `}>
            <div>
                <div className={`relative h-full dark:text-dark_text_1  rounded-lg 
                ${currentUser ? " border-[3px] border-green_3" : "dark:bg-dark_bg_2 p-1"}
                ${currentUser && file.public_id.split(".")[1] === "png" ? "bg-white" : "bg-green_2 p-1"}
                `}>
                    {/* messages */}
                    <p className={`h-full text-sm ${type !== "IMAGE" && type !== "VIDEO" ? "pb-5" : ""}`}>
                        {type === "IMAGE" || type === "VIDEO" ?
                            <FileImageVideo url={file.secure_url} type={type} /> :
                            <OtherFiles file={file} type={type} />
                        }
                    </p>
                    {/* dates */}
                    {/* <span className='float-right text-xs pt-6 text-dark_text_5'> */}
                    <span className="absolute right-1.5 bottom-1.5 text-xs text-dark_text_5 leading-none">
                        {moment(message.createdAt).format("HH:mm")}
                    </span>
                    <span>
                        {!currentUser ?
                            <TriangleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5" />
                            : null}
                    </span>
                </div>
            </div>
        </div>
    )
}
