import React, {useState, useContext, useEffect} from "react";
import callAPI from "../../Util/callAPI";

const UserContext = React.createContext();
const UpdateUserContext = React.createContext();

export function useUserContext()
{
    return useContext(UserContext);
}

export function useUpdateUserContext()
{
    return useContext(UpdateUserContext);
}

export function UserProvider({children})
{
    const [loginState, setLoginState] = useState({isLogin: false, user: null});

    useEffect(() => {
        const fetchData = async () =>
        {
            const res = await callAPI("GET", "users/profile",null);
            if(res.data.err)
            {
                setLoginState({isLogin: false, user: null})
            }
            else
            {
                setLoginState({isLogin: true, user: res.data.user})
            }
        }
        fetchData();
    }, [loginState.isLogin])

    const updateLoginState = (newIsLogin, newUser) =>
    {
        setLoginState({isLogin: newIsLogin, user: newUser})
    }

    return(
        <UserContext.Provider value={loginState}>
            <UpdateUserContext.Provider value={updateLoginState}>
                {children}
            </UpdateUserContext.Provider>
        </UserContext.Provider>
    )
}