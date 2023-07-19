import { useContext, useEffect } from "react"
import { SelectedPageContext } from "renderer/utils/context/SelectedPageContext"

export default function Vid2ImgPage() {
//ts
const {updatePage} = useContext(SelectedPageContext)
useEffect(()=> {
  updatePage("Video To Image Converter")
},[])
    return (
        //html
        <div>
            Video to Image Page
        </div>
    )
}
