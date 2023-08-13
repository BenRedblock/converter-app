import { Select } from "renderer/utils/styled-components"
import "./components-styles.css"
import { useEffect, useState } from "react"

interface Props {
  options: string[]
  category?: number[]
  onSelect: (selected: string) => void;
  select: string
}

export default function Dropdown({options, category, onSelect, select}: Props) {
  const [selected, setSelected] = useState<string>(select)

  useEffect(()=> {
    onSelect(selected)
  },[selected])

  return (
    <Select value={selected} onChange={(e)=> setSelected(e.target.value)}>
      {options.map((option, index)=> {
        return(<>
          {category && category.includes(index) ? <option key={index +"format"} disabled value={index}>{option}</option> : <option key={index} value={index}>{option}</option>}
          </>
        )
      })}
    </Select>
  )
}
