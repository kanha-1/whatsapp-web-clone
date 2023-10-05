
import PDF from "../Preview/Images/PDF.png"
import PPTX from "../Preview/Images/PPTX.png"
import TXT from "../Preview/Images/TXT.png"
import DOCX from "../Preview/Images/DOCX.png"
import { bytesToKB } from "../../../utils/bytesConverter"
import DownloadIcon from "../../../svg/Download"
export default function OtherFiles({ file, type }) {
    console.log(file, "public_id");
    const icons = {
        PDF: PDF,
        PPTX: PPTX,
        TXT: TXT,
        DOCX: DOCX,
    };
    return (
        <div className="bg-green_3 p-2 rounded-md">
            <div className="flex justify-between gap-w-8">
                <div className="flex items-center gap-2">
                    <img src={icons[type]} alt={type} className="w-8 object-contain" />
                    <div className="flex flex-col gap-2 m-1">
                        <h1>{file.original_filename}.{file.public_id.split(".")[1]}</h1>
                        <span> {type} . {bytesToKB(file.bytes)}</span>
                    </div>
                </div>
                <a href={file.secure_url} target="_blank" download>
                    <DownloadIcon />
                </a>
            </div>
        </div>
    )
}
