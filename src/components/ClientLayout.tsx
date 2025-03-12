'use client';

import { Provider } from "react-redux";
import { store } from '../redux/store.js';
import { TypingStatsProvider } from '../context/typingStatsContext.js';
import { Toaster } from 'react-hot-toast';
import CustomNavbar from './customNavbar';
import Footer from './footer';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <TypingStatsProvider>
        <CustomNavbar />
        <main className="p-24">
          {children}
        </main>
        <Footer />
        <Toaster position="top-right" />
      </TypingStatsProvider>
    </Provider>
  );
} 