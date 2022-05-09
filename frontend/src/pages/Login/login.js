import NavBar from "../../components/NavBar";
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { post } from '../../application/middlewares/index';
import { SetCookie } from '../../utils/cookie';
import { loginSuccess } from '../../application/actions/auth';
import { useNavigate } from 'react-router-dom';


function Login (){
    const { register, handleSubmit, formState: { errors }, setError } = useForm({//setError
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();
    // const history = useHistory()
    const navigate = useNavigate()
    const onSubmit = (data)=>{
        dispatch(post({
            url:`api/admin/login`,
            data,
            action : (response) =>{
                if(response.success){
                    SetCookie('refresh_token', response.data.refresh_token);
                    dispatch(loginSuccess(response.data));
                    navigate("/")
                }else{
                    setError("name", {message:response.error?.data?.error?.name})
                    setError("password", {message:response.error?.data?.error?.name})

                }
            }
        }))
    }

    return (
        <>
        <NavBar/>
        <div className="pt-5 w-full h-full relative flex flex-row justify-center w-full h-full  items-center lg:px-40">
        <form style={{height:450}} onSubmit = {handleSubmit(onSubmit)} className="w-full max-w-sm relative px-8 flex flex-col justify-center items-center rounded-xl shadow-2xl mx-2 sm:mx-6 lg:mx-12">
            <p className="text-3xl pt-3 pb-2 font-semibold text-center text-gray-800">
                Войти
            </p>
            <div className="w-full flex flex-col mt-12">
                <div className="relative w-full mb-6">
                    <label>Имя</label>
                    <input type="tel" {...register("name")}
                        autoComplete="off"
                        className={`${errors.name ? 'border-2 border-red-300 ring-red-100' : 'ring-indigo-600'} pl-2 shadow-inner h-10 w-full text-base bg-gray-50 rounded-md z-20 focus:bg-white focus:outline-none focus:ring-2 `}
                        placeholder="dowran"
                    />
                    
                    <p className="absolute bottom-0 left-0 -mb-4 text-xs font-medium text-red-400">
                        {errors?.name?.message}
                    </p>
                </div>
                <div className="relative w-full mb-4">
                    <label >Пароль</label>
                    <input autoComplete="false" {...register("password")}
                        type="password"
                        className={`${errors.password ? 'border-2 border-red-300 ring-red-100' : 'ring-indigo-600'} pl-2 shadow-inner h-10 w-full text-base bg-gray-50 rounded-md z-20 focus:bg-white focus:outline-none focus:ring-2`}
                        placeholder="********"
                    />
                    <p className="absolute bottom-0 left-0 -mb-4 text-xs font-medium text-red-400">
                        {errors?.password?.message}
                    </p>
                </div>
                <div className="absolute bottom-12 lg:bottom-10 left-0 right-0 mx-auto">
                    <div className="w-full flex justify-center items-center">
                        <button type="submit" disabled={0} className="w-40 flex remove-button-bg justify-center items-center px-4 h-10 text-white transform ease-in-out duration-300 hover:scale-110 active:scale-100 font-semibold text-base rounded-full bg-green-500 hover:bg-green-400 active:bg-green-500 focus:outline-none shadow-md">
                            {0 ?
                                <div className="w-12"><p size="sm" ></p></div>
                            :
                                'Войти'
                            }
                        </button>
                    </div>
                </div>
            </div>
        </form>
       
    </div>
    </>
    )
}

const schema = Yup.object().shape({
    name: Yup.string().min(5, "Минимум 8 значений").max(150, "Максимум 8 значений")
    .required("Номер телефона обязателен"),
    password: Yup.string().min(3, "Минимум 8 значений").max(50, "Максимум 50 значений").required('Пароль обязателен')
});
 
export default Login;