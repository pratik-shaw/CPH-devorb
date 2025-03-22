// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Critical Phoenix - Professional Esports Tournaments & Events',
  description: 'Join the elite esports community with Critical Phoenix. Participate in top-tier tournaments for BGMI, Valorant, Free Fire and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        {children}
        
        {/* Properly load client-side scripts */}
        <Script id="custom-cursor-script" strategy="afterInteractive">
          {`
            // Wait for everything to fully load
            window.addEventListener('load', () => {
              const cursor = document.getElementById('custom-cursor');
              
              if (cursor && window.innerWidth >= 1024) {
                // Make cursor visible after load
                cursor.style.opacity = "1";
                
                // Update cursor position on mouse move
                document.addEventListener('mousemove', (e) => {
                  cursor.style.left = e.clientX + 'px';
                  cursor.style.top = e.clientY + 'px';
                });
                
                // Scale cursor on mousedown/mouseup
                document.addEventListener('mousedown', () => {
                  cursor.classList.add('cursor-active');
                });
                
                document.addEventListener('mouseup', () => {
                  cursor.classList.remove('cursor-active');
                });
                
                // Add hover effect for interactive elements
                const interactiveElements = document.querySelectorAll('a, button, input, select, [role="button"]');
                
                interactiveElements.forEach(el => {
                  el.addEventListener('mouseenter', () => {
                    cursor.classList.add('cursor-hover');
                  });
                  
                  el.addEventListener('mouseleave', () => {
                    cursor.classList.remove('cursor-hover');
                  });
                });
              }
            });
          `}
        </Script>
      </body>
    </html>
  );
}