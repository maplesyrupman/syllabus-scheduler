import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import db from "@/utils/db.js"

const handler = NextAuth({
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
    async session({ session, token }) {
      if (!session.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
    async signIn(user, account, profile) {
      try {
        const usersCollection = db.collection('users');

        const existingUser = await usersCollection.findOne({ email: user.email });

        if (!existingUser) {
          await usersCollection.insertOne({
            email: user.email,
            name: user.name
          });
        }

        return true
      } catch (err) {
        console.log(err)
      }
    }
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }