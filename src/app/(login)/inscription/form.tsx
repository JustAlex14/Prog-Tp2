"use client"

import { Schema, z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { NumberInput, TextInput, Button, Box, Group, PasswordInput } from '@mantine/core';
import Link from 'next/link';
import { NoticeMessage, SectionContainer } from 'tp-kit/components';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const schema = z.object({
  name: z.string().min(2, { message: 'Le nom doit faire minimum 2 lettres' }),
  email: z.string().email({ message: 'Email Invalide' }),
  password: z.string().min(8, { message: 'Le mot de passe doit faire minimum 8 lettres' }),
});

export const Form = function () {
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
  });


  const [noticeMessage, setNoticeMessage] = useState([]);
  const router = useRouter();
  const supabase = createClientComponentClient();

  async function onFormSubmit(values : z.infer<typeof schema>) {
    const handleSignUp = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
                data: {
                    name : values.name
                }
            }
        })
    
    

    
    if (handleSignUp.error) {
      setNoticeMessage([{type: "error", message: handleSignUp.error.message}]);
    }
    else {
      setNoticeMessage([{type: "success", message: "Votre inscription a bien été prise en compte, vous pouvez vous connecter."}]);
    }
  }

  return (
    <SectionContainer wrapperClassName="max-w-5xl">
      <Box maw={340} mx="auto" className="shadow-md my-5 bg-white rounded">

        <form onSubmit={form.onSubmit(onFormSubmit)} className="p-5">
        <h1 className="mb-3">INSCRIPTION</h1>
        
        {noticeMessage.map((notice, i) => (
          <NoticeMessage key={i}{...notice}/>
        ))}

        <TextInput
            withAsterisk
            label="Nom"
            placeholder="John Doe"
            mt="sm"
            {...form.getInputProps('name')}
          />
          
          <TextInput
            withAsterisk
            label="Email"
            placeholder="test@siuu.f"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            withAsterisk
            label="Mot de passe"
            placeholder="Mot de passe"
            {...form.getInputProps('password')}
          />

          
          <Button type="submit" className="bg-green-600 my-5 items-center hover:bg-green-600 h-12" fullWidth="true" >S'inscrire</Button>
          <Link href={'../connexion'}> <p className="text-sm text-center text-green">Vous avez un compte? Connectez vous!</p></Link>
        </form>
        
      </Box>
    </SectionContainer>
  );
}