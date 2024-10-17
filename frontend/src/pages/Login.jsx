// Components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Modules
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Link } from "react-router-dom"
import dbFetch from "@/config/axios"

const formSchema = z.object({
    email: z.string().email({ message: "Digite um email válido" }).trim().min(3, { message: "Minimo de 3 caracteres" }).max(150),
    password: z.string().trim().min(5, { message: "Minimo de 5 caracteres" }).max(150),
})

const Login = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { 
            email: "",
            password: "",
        }
    })

    const handleLogin = async(values) => {
        try {
            const res = await dbFetch.post("/users/login", {
                email: values.email,
                password: values.password,
            })

            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex justify-center items-center flex-col bg-bgcolor h-screen">
            <h2 className="text-textcolor text-2xl mb-5">Faça o seu login</h2>
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

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="text-textcolor">
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite sua senha" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-center mt-5"><Button type="submit">Login</Button></div>
                </form>
            </Form>
            <p className="text-textcolor mt-5">Não tem uma conta? <Button className="text-textcolor p-0" variant="link"><Link to={"/register"}>Criar</Link></Button></p>
        </div>
    )
}

export default Login
