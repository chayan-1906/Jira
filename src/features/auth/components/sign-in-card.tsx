'use client';

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import DottedSeparator from "@/components/dotted-separator";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import Link from "next/link";
import Routes from "@/utils/Routes";
import {useLogin} from "@/features/auth/api/use-login";
import {loginSchema} from "@/features/auth/schemas";

function SignInCard() {
    const {mutate, isPending} = useLogin();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            // code: 0,
        },
    });

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        console.log('onSubmit in sign-in card');
        console.log({values});
        mutate({
            json: values,
        });
    }

    return (
        <Card className={'w-full h-full md:w-[487px] border-none shadow-none'}>
            {/** card header */}
            <CardHeader className={'flex p-7 items-center justify-center text-center'}>
                <CardTitle className={'text-2xl'}>Welcome Back!</CardTitle>
            </CardHeader>

            <div className={'px-7 mb-2'}>
                <DottedSeparator/>
            </div>

            {/** card content */}
            <CardContent className={'p-7'}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4'}>
                        {/** email */}
                        <FormField
                            name={'email'}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type={'email'} disabled={isPending} placeholder={'Enter email address...'} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/** password */}
                        <FormField
                            name={'password'}
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type={'password'} disabled={isPending} placeholder={'Enter your password...'} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <Button disabled={isPending} size={'lg'} className={'w-full'}>Login</Button>
                    </form>
                </Form>
            </CardContent>

            <div className={'px-7'}>
                <DottedSeparator/>
            </div>

            {/** sign with socials */}
            <CardContent className={'flex flex-col p-7 gap-y-4'}>
                <Button variant={'secondary'} size={'lg'} className={'w-full'} disabled={isPending}><FcGoogle className={'mr-2'}/>Login with Google</Button>
                <Button variant={'secondary'} size={'lg'} className={'w-full'} disabled={isPending}><FaGithub className={'mr-2'}/>Login with GitHub</Button>
            </CardContent>

            <div className={'px-7'}>
                <DottedSeparator/>
            </div>

            <CardContent className={'flex items-center justify-center p-7'}>
                <p>Don&apos;t have an account?{' '}
                    <Link href={Routes.signUpPath}><span className={'text-blue-700 hover:underline'}>Sign Up</span></Link>
                </p>
            </CardContent>
        </Card>
    );
}

export default SignInCard;
