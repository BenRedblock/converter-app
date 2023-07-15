import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { SelectedPageContext } from "renderer/utils/context/SelectedPageContext"

export function HomePage() {
    const navigate = useNavigate()
    const {updatePage} = useContext(SelectedPageContext)
    updatePage("HomePage")
    return (
        <div>
            Home Page
            <button onClick={() => navigate("/tools/vid2img")}>
                deine mutter
            </button>
        </div>
    )
}