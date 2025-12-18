// app/layout.js or layout.js (Next.js 13+)
import './globals.css';


export const metadata = {
  title: 'Vid2Text - AI Video Transcription Platform',
  description: 'Convert videos to text instantly with AI-powered accuracy',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#212842] text-[#F0E7D5]">
       
        {children}
      </body>
    </html>
  );
}