import React from 'react';
import '@/shared/styles/globals.scss';
import { Inter } from 'next/font/google';

import Navbar from '@/app/components/Navbar/Navbar';
import { SHARED_META } from '@/shared/meta';
import ToasterProvider from '@/app/providers/ToasterProvider';
import SessionProvider from '@/app/providers/SessionProvider';
import StateProvider from '@/app/providers/StateProvider';
import ModalViewer from '@/app/components/ModalViewer/ModalViewer';
import Footer from '@/app/components/Footer/Footer';
import Container from '@/shared/components/Container/Container';
import ScrollToTop from '@/shared/components/ScrollToTop/ScrollToTop';
import getCurrentUser from '@/app/serverActions/getCurrentUser';

export const metadata = {
    ...SHARED_META,
};

const inter = Inter({
    subsets: ['latin', 'cyrillic'],
});

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getCurrentUser();

    return (
        <html lang='ru'>
        <head>
            <link rel='manifest' href='/manifest.json' />
        </head>
        <body className={inter.className}>
        <StateProvider user={user}>
            <ScrollToTop />
            <ToasterProvider />
            <ModalViewer />
            <SessionProvider>
                <Navbar />
            </SessionProvider>
            <main className={'main-layout'}>
                <Container>
                    {children}
                </Container>
            </main>
        </StateProvider>
        <Footer />
        </body>
        </html>
    );
};

export default RootLayout;
