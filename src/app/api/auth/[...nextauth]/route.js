import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import connectToDatabase from "@/lib/db"

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        },
      },
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      // console.log(`account: ${JSON.stringify(account)}`);

      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token}) {
      if (!session.accessToken) {
        session.accessToken = token.accessToken;
      }

      const db = await connectToDatabase()
      const userCollection = db.collection('users')

      const mongoUser = await userCollection.findOne({email: session.user.email})
      return {
        ...session, 
        user: {
          ...mongoUser
        }
      };
    },
    async signIn(user, account, profile) {
      console.log('client id', process.env.GOOGLE_CLIENT_ID)
      const db = await connectToDatabase().catch(error => console.log(error))
      const users = db.collection('users')
      try {
        const existingUser = await users.findOne({ email: user.user.email });

        if (!existingUser) {
          await users.insertOne({
            email: user.email,
            name: user.name,
          });
        }

        return true
      } catch (err) {
        console.log('error: ',err)
      }
    }
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authConfig)

export { handler as GET, handler as POST, authConfig }