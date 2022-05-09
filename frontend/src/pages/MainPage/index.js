import { useEffect, useReducer } from "react"
import MyNavBar from "../../components/NavBar"
import Filters from "./Filters"
import Form from "./Form"
import {useDispatch, useSelector} from "react-redux"
import { get } from "../../application/middlewares"
import toast from "react-hot-toast"
import ToDoCart from "./Card"
import { Grid } from "@mantine/core"
import CustomPaginaton from "../../components/CustomPaginaton"
import useTimeOut from "../../components/useTimeOut.js"

function reducer (state, action){
    switch (action.type){
        case "SET_VISIBLE_FORM":
            return {
                ...state,
                visible:true,
                form:"add",
                values:{}
            }
        case "SET_CLOSE_MODAL":
            return{
                ...state,
                values:{},
                visible:false
            }
        case "SET_SEARCH":
            return {
                ...state,
                search:action.payload,
                trigger:!state.trigger,
                page:1
            }   
        case "SET_FILTER":
           {console.log(action.payload)
                return {
                ...state,
                column:action.payload?.column,
                direction:action.payload?.direction,
                trigger:!state?.trigger,
                page:1
            }}
        case "SET_DATA":
            return {
                ...state,
                data:action.payload.list,
                count:action.payload.count
            }
        case "SET_PAGE":
            return {
                ...state,
                page:action.payload,
                trigger:!state.trigger
            }
        case "OPEN_EDIT_FORM":
            return {
                ...state,
                visible:true,
                values:action.payload,
                form:"update"
            }
        case "UPDATE_POST":
            return{
                ...state,
                visible:false,
                data:state.data.map(item => {
                    if(+item.id === +action.payload.id){
                        return action.payload
                    }return item
                })
            }
        case "CLEAR" :
            return{
                ...state,
                data:[]
            }
        case "ADD_POST":
            return {
                ...state,
                data: [action.payload, ...state.data?.slice(0, 2)],
                visible:false
            }
        case "SUBMIT_DATA":
            return {
                ...state,
                data:state.data.map(item =>{
                    if(+item.id === +action.payload){
                        item.status_id = 3
                    }return item
                })
            }
        default: return state
    }
}

function MainPage (){

    const [state, setState] = useReducer(reducer, {
        data:[], count:0, page:1, limit:3, search:"", column:"", direction:"",
        visible:"", form:"", values:{}, tigger:true
    })
    const dispatch = useDispatch()
    useEffect(()=>{
        setState({type:"CLEAR", payload:""})
        dispatch(get({
            url:`api/get-posts?page=${state.page-1}&limit=${state.limit}&column=${state.column ? state.column : "" }&direction=${state.direction ? state.direction : ""}&search=${state?.search}`,
            action: (response) =>{
                if(response.success){
                    setState({type:"SET_DATA", payload:response.data?.rows})
                }else{
                    toast.error("sometihnig went wwronf")
                }
            }
        })) // eslint-disable-next-line
    }, [state.trigger])

    const handleSearch = useTimeOut({action : (value) => setState({type:"SET_SEARCH",payload:value}), time:500})
    

    const token = useSelector(state => state?.auth?.token)
    return (
        <>
             <MyNavBar/>
            <Filters 
                openModal = {()=>setState({type:"SET_VISIBLE_FORM", payload:""})} 
                handleSearch = {(value)=>handleSearch(value)}
                seFilter = {(value) =>setState({type:"SET_FILTER", payload:value})}
            />
            <Form 
                token={token} values = {state.values} form={state?.form} visible = {state?.visible} 
                setCloseModal = {()=>setState({type:"SET_CLOSE_MODAL", payload:""})} 
                updatePost = {(values) =>setState({type:"UPDATE_POST", payload:values})}
                addPost = {(value) =>setState({type:"ADD_POST", payload:value})}
                
                />
            <Grid className="pt-10 pb-5">
                {state.data?.length && 
                    state.data.map(item => <Grid.Col key = {item.id} span={4}><ToDoCart submitData={(value)=>setState({type:"SUBMIT_DATA", payload:value})} openEditForm={(values)=>setState({type:"OPEN_EDIT_FORM", payload:values})} token = {token} item = {item}/></Grid.Col>)
                }
            </Grid>
            <CustomPaginaton page={state.page} total = {Math.floor(state.count/state.limit)+ 1 } setPage = {(value) =>setState({type:"SET_PAGE", payload:value})} />
        </>
    )
}

export default MainPage