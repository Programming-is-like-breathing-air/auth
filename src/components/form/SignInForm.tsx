'use client';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import GoogleSignInButton from "../GoogleSignInButton";
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation";

const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string().min(1, 'Password is required').min(8, 'Password must have more than 8 characters.'),
})

const SignInForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const signInData = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false, // 确保不自动重定向
        });

        if (signInData?.error) {
            console.error(signInData.error);
            // 这里可以显示错误消息，而不是跳转
        } else {
            router.push('/admin');
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input placeholder="mail@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your password" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button className='w-full mt-6' type="submit">Sign In</Button>
            </form>
            <div className='mx-auto my-4 flex w-full items-center justify-evenly 
            before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 
            after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
                or
            </div>
            <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
            <p className='text-center text-sm口text-gray-600 mt-2'>
                If you don&apos;t have an account, please&nbsp;
                <Link className='text-blue-500 hover:underline' href='/sign-up'> Sign Up</Link>
            </p>
        </Form>
    )
}

export default SignInForm
