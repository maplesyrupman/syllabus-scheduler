import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

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
      console.log(`account: ${JSON.stringify(account)}`);

      if (account && account.access_token) {
        console.log('Access Token Present');
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('from auth handler' + session.accessToken)
      if (!session.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    }
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }