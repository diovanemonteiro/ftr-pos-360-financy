import {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Link} from "react-router-dom";
import {Coins, Mail, Lock, Eye, EyeOff, EyeClosed, UserPlus, UserRoundPlus} from "lucide-react";

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = () => {

    }

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center gap-6">
            <div className="flex items-center gap-2">
                <Coins className="size-6 text-primary" />
                <span className="text-xl font-extrabold tracking-tight text-primary">FINANCY</span>
            </div>

            <Card className="w-full max-w-md rounded-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Fazer login
                    </CardTitle>
                    <CardDescription className="text-center">
                        Entre na sua conta para continuar
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <div className="relative">
                                <Mail className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="mail@exemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-8"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <div className="relative">
                                <Lock className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Digite sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="px-8"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                                >
                                    {showPassword ? <EyeClosed className="size-5" /> : <Eye className="size-5" />}
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
                        <Button type="submit" className="w-full">
                            Entrar
                        </Button>
                    </form>

                    <div className="my-4 flex items-center gap-3">
                        <div className="h-px flex-1 bg-border" />
                        <span className="text-xs text-muted-foreground">ou</span>
                        <div className="h-px flex-1 bg-border" />
                    </div>

                    <p className="mb-4 text-center text-sm text-muted-foreground">
                        Ainda não tem uma conta?
                    </p>

                    <Button
                        variant="outline"
                        className="w-full"
                        render={<Link to="/register" />}
                        nativeButton={false}
                    >
                        <UserRoundPlus className="size-4" />
                        Criar conta
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
