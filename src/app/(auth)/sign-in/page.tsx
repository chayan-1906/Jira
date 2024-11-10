import SignInCard from "@/features/auth/components/sign-in-card";
import {getCurrent} from "@/features/auth/actions";
import {redirect} from "next/navigation";
import Routes from "@/utils/Routes";

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
