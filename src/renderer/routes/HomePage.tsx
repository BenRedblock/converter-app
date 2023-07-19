import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { SelectedPageContext } from "renderer/utils/context/SelectedPageContext"

export function HomePage() {
    const navigate = useNavigate()
    const {updatePage} = useContext(SelectedPageContext)
    useEffect(() => {
      updatePage("Home")
    },[])
    return (
        <div>
            Home Page
            <button onClick={() => navigate("/tools/vid2img")}>
                deine mutter
            </button>

            {location.pathname}
        </div>
    )
}
