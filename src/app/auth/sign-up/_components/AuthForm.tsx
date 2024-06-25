'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { supabaseClientComponent } from '@/src/libs/supabase';


// import { signUpAction } from '../actions/auth';

export const signUpSchema = z
  .object({
    email: z
      .string()
      .email('Invalid email address')
      .min(5, 'Email must be at least 5 characters long')
      .max(255, 'Email must be at most 255 characters long'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    repeatPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long'),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ['repeatPassword'], // path of error
  });

type signUpInput = z.infer<typeof signUpSchema>;

export function AuthForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<signUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  async function onSubmit(values: signUpInput) {
    setIsLoading(true);
    console.log("values", values);

    // const { success, message } = await signUpAction(values);
    const { data: signUpResult, error: signUpError } = await supabaseClientComponent.auth.signUp({
      email: values.email,
      password: values.password,
    });

    console.log("signup result", signUpResult)

    if (signUpError) {
      const { message } = signUpError
      return toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    }

    form.reset();
    setIsLoading(false);
    toast({
      title: 'Success',
      description: 'Sign up successful',
    });
  }

  return (
    <div className={cn('grid gap-2 max-w-xl mx-auto bg-white p-4 rounded-md shadow-md')}>
      <h1 className="font-bold text-2xl text-center">Sign Up</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='joe@johnson.com' {...field} />
                </FormControl>

                {/* this shows the error message */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormDescription>
                  Please enter your Password, it must be at least 8 characters
                  long
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='repeatPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repeat Password</FormLabel>
                <FormControl>
                  <Input type='password' {...field} />
                </FormControl>
                <FormDescription>Please re-enter your password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='md:mt-2 md:mb-2 w-full' type='submit'>
            Submit
          </Button>
        </form>
      </Form>

      {/* <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='border-t w-full' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Or continue with
          </span>
        </div>
      </div> */}
      {/* <Button variant='outline' type='button' disabled={isLoading}>
        {isLoading ? (
          <FaSpinner className='mr-2 w-4 h-4 animate-spin' />
        ) : (
          <FaGithub className='mr-2 w-4 h-4' />
        )}{' '}
        GitHub
      </Button> */}
    </div>
  );
}