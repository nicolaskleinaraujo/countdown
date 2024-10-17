// Components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Modules
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    email: z.string().email({ message: "Digite um email válido" }).trim().max(150),
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

    const handleLogin = (values) => {
        console.log(values)
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLogin)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite seu email" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite sua senha" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Login</Button>
                </form>
            </Form>
        </div>
    )
}

export default Login