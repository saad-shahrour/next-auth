"use client"
import { FunctionComponent } from "react";
import {useRouter} from "next/navigation"
import {useState} from "react"

interface UserFormProps {
    
}
 
const UserForm: FunctionComponent<UserFormProps> = () => {
    
    const router = useRouter()
    const [formData, setFormData] = useState({name: "", email: "", password: ""})
    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = (e:any) => {
        const value = e.target.value
        const name = e.target.name
        setFormData(prev => ({...prev, [name]: value}))
        
    }
    
    const handleSubmit = async (e:any) => {
        e.preventDefault()
        console.log(formData);
        setErrorMessage("")
        const res = await fetch("/api/users", {
            method: "POST", 
            // we are sending formData inside the body
            body: JSON.stringify({formData}),
            headers: {
                "content-type": "application/json"
            }
        })

        if (!res.ok) {
            const response = await res.json()
            setErrorMessage(response.message)
        } else {
            router.refresh()
            router.push('/')
        }
    }

    return ( 
        <>    
            <form method="post" onSubmit={handleSubmit} className="flex flex-col gap-3 w-1/2">
                <h1>Create New User</h1>
                <label>Full Name</label>
                <input id="name" type="text" name="name" onChange={handleChange} required value={formData.name} className="m-2 bg-slate-400 rounded"/>
                <label>Email</label>
                <input id="email" type="text" name="email" onChange={handleChange} required value={formData.email} className="m-2 bg-slate-400 rounded"/>
                <label>Password</label>
                <input id="password" type="password" name="password" onChange={handleChange} required value={formData.password} className="m-2 bg-slate-400 rounded"/>
                <input type="submit" value="Create User" className="bg-blue-300 hover:bg-blue-100"/>
            </form>
            <p className="text-red-500">
                {errorMessage}
            </p>
        </>
    );
}
 
export default UserForm;