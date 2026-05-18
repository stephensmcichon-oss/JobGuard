import './globals.css';
import { TaskProvider } from '@/context/TaskContext';
import ClientLayout from '@/components/ClientLayout';

export const metadata = {
  title: 'Job Guard',
  description: 'High-density task management and time tracking',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <TaskProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </TaskProvider>
      </body>
    </html>
  );
}
