"use client"

import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { NumberInput, TextInput, Button, Box, Group, PasswordInput } from '@mantine/core';
import Link from 'next/link';
import {NoticeMessage, SectionContainer} from "tp-kit/components";

const schema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: 'Name should have at least 8 letters' }),
});

export default function InscriptionPage() {
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  return (
    
    <Box maw={340} mx="auto" className="shadow-md my-5 bg-white rounded">
      <form onSubmit={form.onSubmit((values: z.infer<typeof schema>) => console.log(values))} className="p-5">
      <h1 className="mb-3">Connexion</h1>

      <NoticeMessage
        message="Vous êtes connecté!"
        onDismiss={function noRefCheck(){}}
        type="success"
      />
      <NoticeMessage
        message="La connexion n'a pas pu s'effectuer, mail ou mdp invalid"
        onDismiss={function noRefCheck(){}}
        type="error"
      />

        <TextInput
          withAsterisk
          label="Email"
          placeholder="test@siuu.f"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="Password"
          {...form.getInputProps('password')}
        />

        
        <Button type="submit" className="bg-green-600 my-5 items-center hover:bg-green-600 h-12" fullWidth="true" >Se connecter</Button>
      </form>
      <Link href={'../inscription'} className="text-sm text-center text-green"><p className="text-sm text-center text-green"> Vous n'avez pas de compte? Créez en un! </p></Link>
    </Box>
  );
}