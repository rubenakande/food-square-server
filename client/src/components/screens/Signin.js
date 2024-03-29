import React, {useState, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { UserContext } from '../../App'
import M from 'materialize-css'
const Signin  = () =>{
    const {/*state,*/ dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const PostData = () => {
        //alert('Hello here')
        M.toast({html: "Welcome", classes:"#c62828 red darken-3"})
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
             M.toast({html: "Invalid email", classes:"#c62828 red darken-3"})
             return
        } 
        //alert(email + ' '+password)
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
           
        }).then(res => res.json())
        .then(data =>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error, classes:"#c62828 red darken-3"})
            }else{
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                dispatch({type:"USER", payload:data.user})
                M.toast({html: "Signin successfully", classes:"#43a047 green darken-1"})
                history.push('/')
            }
        }).catch(err =>{
            console.log(err)
        })
        alert('Sign in successfully')
        history.push('/')
        //M.toast({html: "Sign in successfully", classes:"#c62828 red darken-3"})
    }
    return(
        <div className="mycard"> 
            <div className="card auth-card input-field">
            <h2>Sign In</h2>
            <form autoComplete="on">
                <input
                    type="text"
                    placeholder="email"
                    value = {email}
                    onChange= {(e)=>setEmail(e.target.value)}
                    />
                <input
                    type="password"
                    placeholder="password"
                    value = {password}
                    onChange= {(e)=>setPassword(e.target.value)}
                    />
                 <button className="btn waves-effect waves-light #1e88e5 blue darken-1"
                 onClick={()=>PostData()}>
                     Login
                 </button>
                
            </form>    
                 <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>
            </div>
        </div>
    )
}
export default Signin