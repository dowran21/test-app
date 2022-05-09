import { Group, TextInput, Select, ActionIcon, Button } from "@mantine/core";
import {IoMdAdd} from "@react-icons/all-files/io/IoMdAdd"

function Filters ({openModal, handleSearch, seFilter}){
    const select_data = [
        {value:"1", column:"tl.name", direction:"ASC", label:"По имени (возростанию)"},
        {value:"2", column:"tl.name", direction:"DESC", label:"По имени (убыванию)"},
        {value:"3", column:"tl.email", direction:"ASC", label:"По мейлу (возростанию)"},
        {value:"4", column:"tl.email", direction:"DESC", label:"По мейлу (убыванию)"},
        {value:"5", column:"tl.text", direction:"ASC", label:"По тексту (возростанию)"},
        {value:"6", column:"tl.text", direction:"DESC", label:"По тексту (убыванию)"},

        
    ]
    return (
        <Group position="apart" className="pt-3">
            <TextInput placeholder="Имя или email" radius={"md"} onChange = {(e) => handleSearch(e.target.value)} />
            <Group direction="row">
                <Select placeholder="Сортировка" onChange={(value)=>seFilter(select_data.filter(item => {
                    if(item.value === value) 
                    return item
                })[0])} data = {select_data} />
                <ActionIcon onClick={()=>openModal()} variant="outline" className="text-blue-500 hover:text-indigo-600"><IoMdAdd className="text-blue-500 hover:text-indigo-600"/></ActionIcon>
            </Group>
        </Group>
    )
}
export default Filters;