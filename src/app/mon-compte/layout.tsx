import { ReactNode } from "react";
import { Button, SectionContainer } from "tp-kit/components";
import prisma from "../../utils/prisma";
import { OrderTable } from "../../components/order-table";
import { getUser } from "../../utils/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/dist/client/components/redirect";


export default async function Layout({ children }: { children: ReactNode }) {
  const orders = await prisma.order.findMany({});
  const supaClient = createServerComponentClient({cookies});
  const user = await getUser(supaClient);


  const clientSignOut = async() => {
    await supaClient.auth.signOut()
    redirect("/connexion");
  }

  if (user == null) {
    redirect("/connexion");
  }

  return (

    <>
      {/* Orders list */}
      <SectionContainer wrapperClassName="py-24 min-h-[80vh]">
        <div className="flex">
          <div className="bg-white rounded-lg p-6 shadow-lg flex-auto w-4 mr-7">
              <h1>MON COMPTE</h1>
              <br/>
              <p>Bonjour, {user?.user_metadata.name}</p>
              <br/>
              <p className="font-bold">
                  Nom : {user?.user_metadata.name}
                  <br/>
                  Email : {user?.email}
              </p>
              <Button variant="outline" fullWidth="true" className="mt-10" onClick={clientSignOut}>Se déconnecter</Button>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg flex-auto w-96">
              <OrderTable orders={orders}/>
          </div>
      </div>
      </SectionContainer>

      {/* Children */}
      {children}
    </>
  );
}
