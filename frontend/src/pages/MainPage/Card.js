import { ActionIcon, Card, Group, Select} from "@mantine/core";
import {BiEdit} from "@react-icons/all-files/bi/BiEdit"
import {IoMdDoneAll} from "@react-icons/all-files/io/IoMdDoneAll"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { post } from "../../application/middlewares";

function ToDoCart ({item, token, openEditForm, submitData}) {
    const dispatch = useDispatch()
    const submitToDo = ()=>{
        dispatch(post({
            url:`/api/admin/submit-post/${item.id}`,
            token,
            action : (response) =>{
                if(response.success){
                    toast.success("Успешно обновлено")
                    submitData(item.id)
                }else{
                    toast.error("Что то пошло не так")
                }
            }
        }))
    }
    return (
        <Card className="bg-gray-50 shadow-inner">
            <Group direction="row">
                <p className="text-red-400">
                    {+item.status_id === 1 ? "Не выполнено" : +item?.status_id === 2 ? "Редакторовано" : "Выполнено"}
                </p>
                {token &&
                    <>
                        <ActionIcon onClick={()=>openEditForm(item)} variant="outline">
                            <BiEdit size = "22" className="text-blue-500"/>
                        </ActionIcon>
                        {
                            item.status_id !== 3 &&
                            <ActionIcon variant="outline" onClick={()=>submitToDo()}>
                                <IoMdDoneAll size="22" className = "text-blue-500"/>
                            </ActionIcon>
                        }
                        
                    </>
                }
            </Group>
            <p>Пользователь: {item.name}</p>
            <p>Email: {item.email}</p>
            <p>Текст</p>
            <p>{item.text}</p>
        </Card>
    )
}

export default ToDoCart;