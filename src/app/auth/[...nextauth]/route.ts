import { authOptions } from "../../../lib/auth"
import NextAuth from "next-auth"

const handler =  NextAuth(authOptions);

export { handler as GET, handler as POST }
// import {handleAuth} from '@auth0/nextjs-auth0'

// export default handleAuth();
