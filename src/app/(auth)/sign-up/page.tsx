import SignUpCard from "@/features/auth/components/sign-up-card";
import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import Routes from "@/utils/Routes";

async function SignUp() {
    const user = await getCurrent();

    if (user) {
        redirect(Routes.homePath);
    }

    return (
        <SignUpCard/>
    );
}

export default SignUp;
