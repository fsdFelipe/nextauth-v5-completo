import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-teal-500 to-zinc-800">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-lg">Auth</h1>
        <p className="text-white text-lg">Serviço de autenticação simples</p>
        <LoginButton>
          <Button variant='secondary' size='lg'>Sign in</Button>
        </LoginButton>
      </div>
    </main>
  );
}
