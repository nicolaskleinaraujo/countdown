// Components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Eye, EyeOff } from "lucide-react"

// Modules
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"
import dbFetch from "@/config/axios"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/context/UserContext"
import { RedirectContext } from "@/context/RedirectContext"
import { toast } from "react-toastify"

const formSchema = z.object({
    email: z.string().email({ message: "Digite um email válido" }).trim().min(3, { message: "Minimo de 3 caracteres" }).max(150),
    password: z.string().trim().min(5, { message: "Minimo de 5 caracteres" }).max(150),
})

const Login = () => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [getRedirect, setGetRedirect] = useState("")

    const { redirect, setRedirect } = useContext(RedirectContext)
    const { setUserId, setUserPages } = useContext(UserContext)

    const [showPassword, setShowPassword] = useState(false)

    const saveRedirect = () => {
        if (redirect !== "") {
            setGetRedirect(redirect)
            setRedirect("")
        }
    }

    const handleLogin = async(values) => {
        setLoading(true)

        try {
            const res = await dbFetch.post("/users/login", {
                email: values.email,
                password: values.password,
            })

            setUserId(res.data.user.id)
            setUserPages(res.data.user.pages)

            setLoading(false)
            navigate(getRedirect !== "" ? getRedirect : "/")
        } catch (error) {
            toast.error(error.response.data.msg)
            setLoading(false)
        }
    }

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { 
            email: "",
            password: "",
        }
    })

    useEffect(() => {
        saveRedirect()
    }, [])

    return (
        <div className="flex justify-center items-center flex-col bg-bgcolor min-h-96">
            <h2 className="text-textcolor text-2xl my-5">Faça o seu login</h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLogin)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-60 mb-5 text-textcolor">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite seu email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    
                    <div className="relative">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="text-textcolor">
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Digite sua senha" 
                                            type={ showPassword ? "text" : "password" } 
                                            { ...field } 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)} 
                            variant="link"
                            size="icon"
                            className="text-textcolor absolute bottom-0 right-0"
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </Button>
                    </div>

                    <div className="flex justify-center mt-5">
                        {!loading ? (
                            <Button type="submit">Login</Button>
                        ) : (
                            <Button disabled>
                                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                Carregando
                            </Button>
                        )}
                    </div>
                </form>
            </Form>

            <p className="text-textcolor my-5">
                Não tem uma conta? 
                <Button className="text-textcolor p-0 ml-1" variant="link">
                    <Link onClick={() => setRedirect(getRedirect)} to={"/register"}>Criar</Link>
                </Button>
            </p>
        </div>
    )
}

export default Login
