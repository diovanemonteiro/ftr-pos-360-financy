import {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Link} from "react-router-dom";
import {Coins, Mail, Lock, Eye, EyeClosed, UserRoundPlus} from "lucide-react";

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center gap-6">

            <div className="flex items-center gap-2">
                <Coins className="size-6 text-primary" />
                <span className="text-xl font-extrabold tracking-tight text-primary">FINANCY</span>
            </div>

            <Card className="w-full max-w-lg rounded-lg space-y-4 px-2 py-8">

                <CardHeader>
                    <CardTitle className="text-xl! leading-7 font-bold text-center text-gray-800">
                        Fazer login
                    </CardTitle>
                    <CardDescription className="text-base leading-6 font-normal text-center text-gray-600">
                        Entre na sua conta para continuar
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="mail@exemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-9"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Digite sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="px-9"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-700"
                                >
                                    {showPassword ? <EyeClosed className="size-4" /> : <Eye className="size-4" />}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="remember-me"
                                    checked={rememberMe}
                                    onCheckedChange={setRememberMe}
                                />
                                <Label htmlFor="remember-me" className="font-normal">Lembrar-me</Label>
                            </div>
                            <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                                Recuperar senha
                            </Link>
                        </div>
                        <Button
                            type="submit"
                            size="xl"
                            className="w-full"
                        >
                            <span className="text-base font-medium text-background leading-6">
                                Entrar
                            </span>
                        </Button>
                    </form>

                    <div className="my-4 flex items-center gap-3">
                        <div className="h-0.5 flex-1 bg-gray-300" />
                        <span className="text-sm leading-5 text-gray-500 font-normal">ou</span>
                        <div className="h-0.5 flex-1 bg-gray-300" />
                    </div>

                    <p className="mb-4 text-center text-sm leading-5 text-gray-600 font-normal">
                        Ainda não tem uma conta?
                    </p>

                    <Button
                        size="xl"
                        variant="outline"
                        className="w-full"
                        render={<Link to="/register" />}
                        nativeButton={false}
                    >
                        <UserRoundPlus className="size-4.5 text-gray-700" />
                        <span className="text-base font-medium text-gray-700 leading-6">
                            Criar conta
                        </span>
                    </Button>
                </CardContent>

            </Card>
        </div>
    )
}
