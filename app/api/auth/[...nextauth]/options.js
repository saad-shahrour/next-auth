import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

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
