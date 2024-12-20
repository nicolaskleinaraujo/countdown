// Component
import { Timer } from "lucide-react"
import { Button } from "./ui/button"
import { GitHubLogoIcon, LinkedInLogoIcon, ReaderIcon } from "@radix-ui/react-icons"

//Components
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="flex flex-col justify-center items-center bg-bgcolor2 text-textcolor border-t-2">
            <Link className="flex flex-row justify-center items-center my-8" to={"/"}>
                <Timer className="h-8 w-8 animate-pulse text-purple-400 mr-2 md:h-10 md:w-10 lg:h-12 lg:w-12" />
                <span className="text-xl font-bold md:text-2xl lg:text-3xl">Countdown</span>
            </Link>

            <div className="text-center mx-5 mb-8">
                <h2 className="text-lg font-bold mb-3 md:text-xl lg:text-2xl">Sobre o projeto</h2>

                <p className="md:text-lg md:max-w-3xl lg:text-xl lg:max-w-4xl">
                    Este site é apenas um projeto feito por <a href="https://github.com/nicolaskleinaraujo" target="_blank" className="underline">Nicolas Klein</a> como objeto de estudo. Sinta-se livre para utilizar os recursos com moderação e consciência.
                </p>
            </div>

            <div className="flex flex-col justify-center items-center gap-3">
                <h2 className="text-lg font-bold md:text-xl lg:text-2xl">Minhas redes</h2>

                <div>
                    <Button variant="ghost" size="icon" className="mr-3">
                        <a href="https://github.com/nicolaskleinaraujo/" target="_blank">
                            <GitHubLogoIcon className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
                        </a>
                    </Button>

                    <Button variant="ghost" size="icon" className="mr-3">
                        <a href="https://www.linkedin.com/in/nicolaskleinaraujo/" target="_blank">
                            <LinkedInLogoIcon className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
                        </a>
                    </Button>

                    <Button variant="ghost" size="icon">
                        <a href="https://nkportfolio.tech/" target="_blank">
                            <ReaderIcon className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
                        </a>
                    </Button>
                </div>
            </div>

            <div className="my-8 pt-8 border-t w-5/6 text-sm text-center md:text-base lg:text-lg">
                <p>&copy; { new Date().getFullYear() } CountdownPro. Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}

export default Footer
