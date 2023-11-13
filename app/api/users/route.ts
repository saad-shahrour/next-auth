import User from "@/app/models/User"
import {NextResponse} from "next/server"
// @ts-ignore
import bcrypt from "bcrypt"

export async function POST(req:Request) {
    try {
        // extract the body and make it in the json format, then extract the formdata we sent in the body
        // when calling the api
        const body = await req.json()
        const userData = body.formData

        // confirm data exists
        if (!userData.email || !userData.password) {
            return NextResponse.json({message: "All fields are required"}, {status: 400})
        }

        // check for duplicated emails (we can make emails lowercase before checking)
        const duplicate = await User.findOne({email:userData.email}).lean().exec()

        if(duplicate) {
            return NextResponse.json({message: "Duplicated Email"}, {status: 409})
        }

        // it is better to not save passwords as their origignal text
        const hashPassword = await bcrypt.hash(userData.password, 10)
        userData.password = hashPassword

        await User.create(userData)
        return NextResponse.json({message: "User Created"}, {status: 201})

    } catch(error) {
        console.log(error);
        return NextResponse.json({message: "error", error}, {status: 500})
    }
}

