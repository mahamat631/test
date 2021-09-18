import React, { useState, useEffect} from "react";
import axios from "../axios/axios";
import md5 from "md5";

const AuthContext = React.createContext();

function getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}

const AuthProvider = (props) => {
    const [user, setUser] = useState(getUser());
    useEffect(() => {
        //setUser(useUser());    
        
        // Pull saved login state from localStorage / AsyncStorage
      }, []);
    const token = localStorage.getItem("token");

    const login = (email, password, props) => {
        let formData = new FormData();
        formData.append("login", email.trim());
        formData.append("password", md5(password));
        const header = {
            "Content-Type": "multipart/form-data"
        }
        axios.post("/members/auth", formData, header)
            .then(({data}) => {
                if(data !== undefined && data.errors.length === 0){
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    props.history.push("/");
                }
                setUser(getUser());
            })
            .catch(e => {
                if(e.response.data.errors !== undefined && e.response.data.errors.length > 0) {
                    console.log(e.response.data.errors[0].text);
                }
            })
    }

    const register = (username, email, password, props) => {
        let formData = new FormData();
        formData.append("login", username);
        formData.append("email", email);
        formData.append("password", md5(password));
        const header = {
            "Content-Type": "multipart/form-data"
        }
        axios.post("/members/signup", formData, header)
            .then(({data}) => {
                if(data !== undefined && data.errors.length === 0){
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    props.history.push("/");
                }
                setUser(getUser());
            })
            .catch(e => {
                if(e.response.data.errors !== undefined && e.response.data.errors.length > 0) {
                    console.log(e.response.data.errors[0].text);
                }
            })
    }
  
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };
  
    const authContextValue = {
        login,
        user,
        logout,
        register,
        token
    };
  
    return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };