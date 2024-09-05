import type { Metadata } from "next";

import "./globals.css";


export const metadata: Metadata = {
  title: "TurckNav",
  description: "Projeto do 8º Semestre de Engenharia da Computação - Unisal realizado pelos Alunos: Bárbara, Christian, Karen e Murilo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
       
      >
        {children}
      </body>
    </html>
  );
}
