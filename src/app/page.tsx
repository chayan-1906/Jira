import UserButton from "@/features/auth/components/user-button";
import {getCurrent} from "@/features/auth/actions";
import {redirect} from "next/navigation";
import Routes from "@/utils/Routes";

async function Home() {
    const user = await getCurrent();

    if (!user) {
        redirect(Routes.signInPath);
    }

    return (
        <div className={'flex flex-col gap-3 p-3'}>
            <UserButton/>
        </div>
    );
}

export default Home;
