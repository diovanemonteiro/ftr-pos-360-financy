import {useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {

    }

    return (
        <>
            <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center gap-6">
                <Card className="w-full max-w-md rounded-xl">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            Acesse a plataforma
                        </CardTitle>
                        <CardDescription>
                            Insira seu email e senha para acessar a plataforma
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Entrar
                        </Button>
                    </form>
                    </CardContent>
                </Card>

                <Card className="w-full max-w-md rounded-xl">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            Ainda nao tem uma conta?
                        </CardTitle>
                        <CardDescription>
                            Cadastre-se agora mesmo
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full" asChild>
                            <Link to="/register">Criar conta</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}