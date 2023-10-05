import axios from "axios"
export const uploadFiles = async (files) => {
    let formData = new FormData()
    formData.append("upload_preset", "whatapp-web")
    let newFiles = []
    for (const f of files) {
        const { file, type } = f
        formData.append("file", file)
        let response = await uploadToCloud(formData)
        newFiles.push({
            file: response,
            type: type
        })
    }
    return newFiles;
}
const uploadToCloud = async (formData) => {
    return new Promise(async (resolve) => {
        return await axios.post(`https://api.cloudinary.com/v1_1/dsseuwzzr/raw/upload`, formData)
            .then(({ data }) => {
                resolve(data)
            }).catch((error) => {
                console.log(error)
            })
    })
}