// Modules
import { useContext } from "react"
import { UserContext } from "@/context/UserContext"

const Home = () => {
    const { userPages } = useContext(UserContext)

    return (
        <div>
            { userPages.length === 0 ? (
                <>
                    <p>Crie uma "Page" personalizada</p>
                </>
            ) : (
                <>
                    { userPages.map(page => (
                        <>
                            <img src={`data:image/png;base64,${page.image.content}`} alt="Imagem da Page" />
                            <p>{page.title}</p>
                        </>
                    ))}

                    <p>Nova "Page"</p>
                </>
            )}
        </div>
    )
}

export default Home
