import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/app/models/User";
import bcrypt from "bcrypt"

export const options = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GithubProvider({
            profile(profile) {
                console.log(profile, "github");

                let userRole = "GitHub User";
                if (profile?.email == "m.saad.shahrour@gmail.com") {
                    userRole = "admin"
                }

                return {
                    ...profile,
                    role: userRole
                }
            },
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            profile(profile) {
                console.log(profile, "google");

                let userRole = "Google User";
                if (profile?.email == "m.saad.shahrour@gmail.com") {
                    userRole = "admin"
                }

                return {
                    ...profile,
                    id: profile.sub,
                    role: userRole
                }
            },
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "email:",
                    type: "text",
                    placeholder: "youremail@gmail.com"
                },
                password: {
                    label: "password:",
                    type: "text",
                    placeholder: "yourpassword"
                }
            },
            async authorize(credentials) {
                try {
                    // lean() is to return the data in a plain JS object without MongoDB features (more efficient)
                    // exec() is optional
                    const foundUser = await User.findOne({email: credentials.email}).lean().exec()

                    if (foundUser) {
                        console.log("user exists");
                        const match = await bcrypt.compare(credentials.password, foundUser.password)
                        if (match) {
                            console.log("good pass");
                            delete foundUser.password

                            foundUser.role = "unverified email"
                            return foundUser
                        }
                    }

                } catch (error) {
                    console.log(error);
                }
                return null
            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            // add our role to the token
            if (user) token.role = user.role
            return token
        },
        async session({session, token}) {
            if (session?.user) session.user.role = token.role
            return session
        }
    }
}
