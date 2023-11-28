"use client"

import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { NumberInput, TextInput, Button, Box, Group, PasswordInput } from '@mantine/core';
import Link from 'next/link';
import { NoticeMessage } from 'tp-kit/components';

const schema = z.object({
  name: z.string().min(2, { message: 'Name should have at least 2 letters' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(8, { message: 'Name should have at least 8 letters' }),
});

export default function InscriptionPage() {
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  return (
    <Box maw={340} mx="auto" className="shadow-md my-5 bg-white rounded">
      <form onSubmit={form.onSubmit((values: z.infer<typeof schema>) => console.log(values))} className="p-5">
      <h1 className="mb-3">INSCRIPTION</h1>

      <NoticeMessage
        message="Votre inscription a bien été prise en compte, vous pouvez vous connecter."
        onDismiss={function noRefCheck(){}}
        type="success"
      />
      <NoticeMessage
        message="Une erreur s'est produite !"
        onDismiss={function noRefCheck(){}}
        type="error"
/>

      <TextInput
          withAsterisk
          label="Name"
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
          label="Password"
          placeholder="Password"
          {...form.getInputProps('password')}
        />

        
        <Button type="submit" className="bg-green-600 my-5 items-center hover:bg-green-600 h-12" fullWidth="true" >S'inscrire</Button>

      </form>
      <Link href={'../connexion'} className="text-sm text-center text-green"> <p className="text-sm text-center text-green">Vous avez un compte? Connectez vous!</p></Link>
    </Box>
  );
}