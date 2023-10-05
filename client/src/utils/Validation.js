import * as Yup from "yup"

export const signupSchema = Yup.object({
    name: Yup.string().required("Name is Required !").matches(/^[a-zA-Z_ ]*$/, "No Special Characters Allowed")
        .min(3, "Please Enter More Than 3 characters"),
    email: Yup.string().required("Email Is Reqyired").email("invalid email address"),
    status: Yup.string().max(64, "Status must be less than 64 characters. !"),
    password: Yup.string().required("Password Required")
})
export const signinSchema = Yup.object({
    email: Yup.string().required("Email Is Reqyired").email("invalid email address"),
    password: Yup.string().required("Password Required")
})