import "./globals.css";
export const metadata = { title: "Guía MFyC · plataforma clínica", description: "Consulta clínica pública y edición gobernada." };
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es"><body><header><a href="/">Guía MFyC</a><nav><a href="/search">Buscar</a><a href="/editor">Panel editorial</a></nav></header>{children}<footer>Contenido clínico sujeto a revisión editorial. No sustituye el juicio clínico.</footer></body></html>; }
