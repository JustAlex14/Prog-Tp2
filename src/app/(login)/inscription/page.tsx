"use client"

import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { NumberInput, TextInput, Button, Box, Group, PasswordInput } from '@mantine/core';
import Link from 'next/link';

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
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values: z.infer<typeof schema>) => console.log(values))}>
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

        
        <Button type="submit" className="bg-green-600 my-5 item-center hover:bg-green-600" >S'inscrire</Button>

      </form>
      <Link href={'../connexion'}> Vous avez un compte? Connectez vous!</Link>
    </Box>
  );
}