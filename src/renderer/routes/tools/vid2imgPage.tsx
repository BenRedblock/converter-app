import { useContext } from "react"
import { SelectedPageContext } from "renderer/utils/context/SelectedPageContext"

export default function Vid2ImgPage() {
//ts
const {updatePage} = useContext(SelectedPageContext)
updatePage("Video to Image Converter")
    return (
        //html
        <div>
            Video to Image Page
        </div>
    )
}
