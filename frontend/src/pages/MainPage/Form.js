import { Button, Modal, Textarea, TextInput } from "@mantine/core"
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { post } from "../../application/middlewares";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Form ({visible, setCloseModal, form, values, token, updatePost, addPost}) {
    const dispatch = useDispatch()
    const {getValues, setValue, formState: { errors }, setError, reset, register, handleSubmit} = useForm({
        resolver:yupResolver(schema)
    })
    useEffect(()=>{
        if(visible && form !== "add"){
            Object.keys(values).forEach(key => {
                if(key !== "id"){
                    setValue(key, values[key])
                }
            })
        }
    }, [visible])

    const onSubmit = (data) =>{
        setLoading(true)
        dispatch(post({
            url: form === "add" ?  "/api/add-post" : `api/admin/update-post/${values?.id}`,
            token,
            data,
            action: (response) =>{
                if(response.success){
                    if(form === "add"){
                        addPost(response.data.rows)
                        toast.success("Успешно добавлено")
                    }else{
                        console.log("hello update success")
                        updatePost({id:values?.id, ...data, status_id:2})
                    }
                    setLoading(false)
                    reset({name:"", email:"", text:""})
                }else{
                    toast.error("что то пошло не так")
                }
            }
        }))
    }
    const [loading, setLoading] = useState()
    return(
        <Modal
            opened = {visible}
            onClose = {()=>{setCloseModal(); reset({name:"", text:"", email:""})}}
            title = {form==="add" ? "Добавить" :"Изменить"}
            centered
            radius={"md"}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col">
                <TextInput className="mt-1" label={"Введите ваше имя"} placeholder={"Довран"} {...register("name")} error = {errors?.name?.message}/>
                <TextInput className="mt-1" label={"Введите ваш email"} placeholder={"ddowran2106@gmail.com"} {...register("email")} error = {errors?.email?.message}/>
                <Textarea className="mt-1 " label={"Введите ваш текст"} placeholder={"какойто текст"} {...register("text")} error = {errors?.text?.message}/>
                <Button loading={loading} variant="outline" type="submit" className="mt-2">
                    {form === "add" ? "Добавить" : "Изменить"}
                </Button>
            </form>

        </Modal>
    )
}
const schema = Yup.object().shape({
    name:Yup.string("Должна быть строка").required("some").min(3, "some").max(100,"some"),
    email:Yup.string("Должна быть строка").required("some").min(3, "some").max(100,"some"),
    text:Yup.string("Должна быть строка").required("some").min(3, "some").max(1000,"some"),
})

export default Form;