import {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";
import {User, Mail, Lock, Eye, EyeClosed, LogIn} from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";
import logo from "@/assets/logo.png";
import {useAuthStore} from "@/stores/auth";
import {toast} from "sonner";

export function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const signup = useAuthStore((state) => state.signup)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await signup({ name, email, password })
            toast.success('Cadastro realizado com sucesso!')
        } catch {
            toast.error('Erro ao realizar o cadastro. O e-mail pode já estar em uso.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center gap-6">

            <div className="flex items-center gap-3">
                <img src={logoIcon} className="size-8" alt="Logo Icon" />
                <img src={logo} className="w-22.5 h-4.5" alt="Logo" />
            </div>

            <Card className="w-full max-w-lg rounded-lg space-y-4 px-2 py-8">
                <CardHeader>
                    <CardTitle className="text-xl! leading-7 font-bold text-center text-gray-800">
                        Criar conta
                    </CardTitle>
                    <CardDescription className="text-base leading-6 font-normal text-center text-gray-600">
                        Comece a controlar suas finanças ainda hoje
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome completo</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Seu nome completo"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="px-9"
                                    required
                                />
                            </div>
                        </div>
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
                                    className="px-9"
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
                            <p className="text-xs text-muted-foreground">
                                A senha deve ter no mínimo 8 caracteres
                            </p>
                        </div>
                        <Button
                            type="submit"
                            size="xl"
                            className="w-full"
                            disabled={loading}
                        >
                            <span className="text-base font-medium text-background leading-6">
                                {loading ? 'Cadastrando...' : 'Cadastrar'}
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
                        variant="outline"
                        size="xl"
                        className="w-full"
                        render={<Link to="/login" />}
                        nativeButton={false}
                    >
                        <LogIn className="size-4" />
                        <span className="text-base font-medium text-gray-700 leading-6">
                            Fazer login
                        </span>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
