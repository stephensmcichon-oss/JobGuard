import './globals.css';
import { TaskProvider } from '@/context/TaskContext';
import ClientLayout from '@/components/ClientLayout';

export const metadata = {
  title: 'Job Guard',
  description: 'High-density task management and time tracking',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="flex h-screen overflow-hidden bg-base-100 text-base-content antialiased transition-colors">
        <TaskProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </TaskProvider>
      </body>
    </html>
  );
}
