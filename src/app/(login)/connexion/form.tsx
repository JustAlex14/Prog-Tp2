"use client"

import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { NumberInput, TextInput, Button, Box, Group, PasswordInput } from '@mantine/core';
import Link from 'next/link';
import {NoticeMessage, NoticeMessageData, SectionContainer, ZodI18nProvider, useZodI18n} from "tp-kit/components";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { getUser } from '../../../utils/supabase';

const schema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(8),
});

export const Form = function () {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useZodI18n(z);
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const [noticeMessage, setNoticeMessage] = useState<NoticeMessageData[]>([]);

  async function onFormSubmit(values : z.infer<typeof schema>) {
    console.log(values)

    const signin = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (signin.error) {
      setNoticeMessage([{type: "error", message: "La connexion n'a pas pu s'effectuer, mail ou mdp invalid"}]);
    }
    else {
      setNoticeMessage([{type: "success", message: "Vous êtes connecté!"}]);
      router.refresh();
      router.push('/mon-compte')
    }
  }

  async function checkConnection() {

    const user = await getUser(supabase);
    if (user != null) {
      router.refresh();
      router.push('/mon-compte')
    }
  }

  checkConnection()

  return (
    <SectionContainer wrapperClassName="max-w-5xl">
      <Box maw={340} mx="auto" className="shadow-md my-5 bg-white rounded">
      
        <form onSubmit={form.onSubmit((values: z.infer<typeof schema>) => onFormSubmit(values))} className="p-5">
        <h1 className="mb-3">Connexion</h1>

          {noticeMessage.map((notice, i) => (
            <NoticeMessage key={i}{...notice}/>
          ))}

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

          
          <Button type="submit" className="bg-green-600 my-5 items-center hover:bg-green-600 h-12" fullWidth >Se connecter</Button>
          <Link href={"../inscription"}><p className="text-sm text-center text-green"> Vous n&apos;avez pas de compte? Créez en un! </p></Link>
        </form>
      </Box>
    </SectionContainer>
  );
}