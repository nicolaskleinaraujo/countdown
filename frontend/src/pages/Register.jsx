// Components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"

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
    nickname: z.string().trim().min(3, { message: "Minimo de 3 caracteres" }).max(15, { message: "Máximo de 15 caracteres" }),
})

const Register = () => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [getRedirect, setGetRedirect] = useState("")

    const { redirect, setRedirect } = useContext(RedirectContext)
    const { setUserId } = useContext(UserContext)

    const saveRedirect = () => {
        if (redirect !== "") {
            setGetRedirect(redirect)
            setRedirect("")
        }
    }

    const handleCreate = async(values) => {
        setLoading(true)

        try {
            const res = await dbFetch.post("/users", {
                email: values.email,
                password: values.password,
                nickname: values.nickname,
            })

            setUserId(res.data.user.id)

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
            nickname: "",
        }
    })

    useEffect(() => {
        saveRedirect()
    }, [])

    return (
        <div className="flex justify-center items-center flex-col bg-bgcolor min-h-96">
            <h2 className="text-textcolor text-2xl my-5">Crie sua conta</h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleCreate)}>
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

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="text-textcolor mb-5">
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input placeholder="Crie sua senha" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="nickname"
                        render={({ field }) => (
                            <FormItem className="text-textcolor mb-5">
                                <FormLabel>Nickname</FormLabel>
                                <FormControl>
                                    <Input placeholder="Crie seu nickname" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-center mt-5">
                        {!loading ? (
                            <Button type="submit">Criar</Button>
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
                Já possui uma conta? 
                <Button className="text-textcolor p-0 ml-1" variant="link">
                    <Link onClick={() => setRedirect(getRedirect)} to={"/login"}>Entrar</Link>
                </Button>
            </p>
        </div>
    )
}

export default Register
