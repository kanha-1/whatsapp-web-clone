export const getConvoId = (user, users) => {
    return users && users[0]?._id === user?._id ? users[1]?._id : users[0]?._id
}
export const getConvoName = (user, users) => {
    return users && users[0]?._id === user?._id ? users[1]?.name : users[0]?.name
}
export const getConvoPicture = (user, users) => {
    return users && users[0]?._id === user?._id ? users[1]?.picture : users[0]?.picture
}

export const checkOnlineStatus = (onlineuser, user, users) => {
    let ConvoId = getConvoId(user, users)
    let checkStatus = onlineuser.find((users) => users.userId === ConvoId)
    return checkStatus
}