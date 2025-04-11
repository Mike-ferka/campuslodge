import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { ThemeProvider } from "@/components/theme-provider"

import { Geist, Geist_Mono } from 'next/font/google'

import "./globals.css";
import NavBar from '@/components/layout/NavBar';
import Container from '@/components/Container';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CampusLodge",
  description: "Book Auditorium, classroom and other equipment of your choice",
  icons:{icon:'/logo.svg'}
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
     
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider  attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange >
       <main className='flex flex-col min-h-screen bg-secondary'>
       <NavBar/>
      
        <section className='flex-grow'>
          <Container>
          {children}
          </Container>
       
        </section>
       </main>
       </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
