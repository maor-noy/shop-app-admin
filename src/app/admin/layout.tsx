import { ReactNode } from 'react';
import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';
import { ADMIN } from '@/components/ui/contants';

export default async function RootLayout({ children }: Readonly<{children: ReactNode;}>) {
    const supabase = createClient();

    const { data: authdata } = await supabase.auth.getUser();

    if(authdata?.user) {
        const { data, error } = await supabase.from('users')
            .select('*')
            .eq('id', authdata.user.id)
            .single();
        if(error || !data) {
            console.error('Error fetching user data', error);
            return ;
        }
        if(data.type === ADMIN) return redirect('/');
    } 

    return <>
        {children}
    </>
}