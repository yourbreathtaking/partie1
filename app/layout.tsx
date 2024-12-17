import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/theme-provider";
import './globals.css';



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
