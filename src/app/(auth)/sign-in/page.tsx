import SignInCard from "@/features/auth/components/sign-in-card";
import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import Routes from "@/utils/Routes";

export const dynamic = 'force-dynamic';

async function SignIn() {
    const user = await getCurrent();

    if (user) {
        redirect(Routes.homePath);
    }

    return (
        <SignInCard/>
    );
}

export default SignIn;
