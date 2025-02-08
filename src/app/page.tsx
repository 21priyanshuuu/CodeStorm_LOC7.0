import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {

  const {isAuthenticated} = getKindeServerSession();

if (!(await isAuthenticated())) {
  return redirect(
    "/api/auth/login?post_login_redirect_url=http://localhost:3000/profile"
  );
}
  return (
    <div>
      <LoginLink>Sign in</LoginLink>

<RegisterLink>Sign up</RegisterLink>
    </div>
  );
}
