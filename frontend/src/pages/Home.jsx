// Modules
import { useContext } from "react"
import { UserContext } from "@/context/UserContext"
import { Link } from "react-router-dom"

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
                        <Link to={`/pages/${page.id}`} key={page.id}>
                            <img src={`data:image/png;base64,${page.image.content}`} alt="Imagem da Page" />
                            <p>{page.title}</p>
                        </Link>
                    ))}

                    <p>Nova "Page"</p>
                </>
            )}
        </div>
    )
}

export default Home
