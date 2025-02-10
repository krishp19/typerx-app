//import type { Metadata } from "next";
"use client"

import { Geist, Geist_Mono } from "next/font/google";
import CustomNavbar from '../components/customNavbar'
import Footer from '../components/footer'
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Provider } from "react-redux";
import {store} from '../redux/store.js'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
        <ClerkProvider>
          <ToastContainer/>
            <CustomNavbar/>
              <main className="p-24">
                {children}
              </main>
            <Footer/> 
        </ClerkProvider>
        </Provider>
      </body>
    </html>
  );
}
