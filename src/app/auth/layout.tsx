import { ADMIN } from '@/components/ui/contants';
import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';

export default async function AuthLayout({children}: Readonly<{ children: React.ReactNode }>) {
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
        if(data.type === ADMIN) return redirect('/admin');
    } 

    return <>
        {children}
    </>
}