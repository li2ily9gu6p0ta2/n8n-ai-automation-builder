import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'n8n AI Automation Builder',
  description: 'Build n8n automations with natural language prompts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
