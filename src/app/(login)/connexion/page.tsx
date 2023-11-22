"use client"

import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { NumberInput, TextInput, Button, Box, Group, PasswordInput } from '@mantine/core';
import Link from 'next/link';

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
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values: z.infer<typeof schema>) => console.log(values))}>
        
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

        
        <Button type="submit" className="bg-green-600 my-5 item-center hover:bg-green-600" >Se connecter</Button>
      </form>
      <Link href={'../inscription'}> Vous n'avez pas de compte? Créez en un!</Link>
    </Box>
  );
}