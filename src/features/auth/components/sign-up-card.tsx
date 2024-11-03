'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import DottedSeparator from "@/components/dotted-separator";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import Link from "next/link";
import Routes from "@/utils/Routes";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";

const formSchema = z.object({
    name: z.string().trim().min(1, 'Required'),
    email: z.string().email(),
    password: z.string().trim().min(8, 'Minimum of 8 characters required'),
});

function SignUpCard() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log({values});
    }

    return (
        <Card className={'w-full h-full md:w-[487px] border-none shadow-none'}>
            {/** card header */}
            <CardHeader className={'flex p-7 items-center justify-center text-center'}>
                <CardTitle className={'text-2xl'}>Sign Up</CardTitle>
                <CardDescription>By signing up, you agree to our {' '}
                    <Link href={Routes.privacy}><span className={'text-blue-700'}>Privacy Policy</span></Link> and {' '}
                    <Link href={Routes.terms}><span className={'text-blue-700'}>Terms of Service</span></Link>
                </CardDescription>
            </CardHeader>

            <div className={'px-7 mb-2'}>
                <DottedSeparator/>
            </div>

            {/** card content */}
            <CardContent className={'p-7'}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-4'}>
                        {/** name */}
                        <FormField
                            name={'name'}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type={'text'} placeholder={'Enter your name...'} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/** email */}
                        <FormField
                            name={'email'}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type={'email'} placeholder={'Enter email address...'} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/** password */}
                        <FormField
                            name={'password'}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type={'password'} placeholder={'Enter your password...'} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <Button disabled={false} size={'lg'} className={'w-full'}>Login</Button>
                    </form>
                </Form>
            </CardContent>

            <div className={'px-7'}>
                <DottedSeparator/>
            </div>

            {/** sign with socials */}
            <CardContent className={'flex flex-col p-7 gap-y-4'}>
                <Button variant={'secondary'} size={'lg'} className={'w-full'} disabled={false}><FcGoogle className={'mr-2'}/>Login with Google</Button>
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <Button variant={'secondary'} size={'lg'} className={'w-full'} disabled={false}><FaGithub className={'mr-2'}/>Login with GitHub</Button>
            </CardContent>

            <div className={'px-7'}>
                <DottedSeparator/>
            </div>
            <CardContent className={'flex items-center justify-center p-7'}>
                <p>Already have an account?{' '}
                    <Link href={Routes.signInPath}><span className={'text-blue-700 hover:underline'}>Sign In</span></Link>
                </p>
            </CardContent>
        </Card>
    );
}

export default SignUpCard;
