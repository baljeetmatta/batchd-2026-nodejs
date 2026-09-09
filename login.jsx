import { useState } from "react"

// const Login=()=>{

//     const [username,setUsername]=useState("");
//     const [password,setPassword]=useState("");
//  const usernameHandler=(e)=>{
//        // console.log(e.target.value);

//         setUsername(e.target.value);



//     }
//     const passwordHandler=(e)=>{
//        // console.log(e.target.value);

//         setPassword(e.target.value);



//     }
    
//     const submitHandler=()=>{
//         console.log("Button Clicked",username,password)

//     }

   
//     return (
//         <div>
//             <div>
//                 <div>Username</div>
//                 <div>
//                 <input type="text" value={username} onChange={usernameHandler}/>
//                 </div>

//             </div>
//             <div>
//                 <div>Password</div>
//                 <div>
//                  <input type="password" value={password} onChange={passwordHandler}/>
//                </div>

//             </div>
//             <div>
//                 <button onClick={submitHandler}>Submit</button>
//             </div>
//         </div>


//     )
// }

const Login=()=>{
    const [formData,setFormData]=useState({});
const [error,setError]=useState("")
    const handleSubmit=()=>{
        console.log(formData);
        fetch("http://localhost:5000/login",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },body:JSON.stringify(formData)
        }).then((response)=>{
            return response.json();
        }).then((response)=>{
            console.log(response)
            if(response.success==false)
                setError(response.message);
            else
                setError("");
            
        })

    }
    const changeHandler=(e)=>{

        //console.log(e.target.name, e.target.value);

        setFormData({...formData,[e.target.name]:e.target.value})

// let obj={name:"test"};
// let data="name";
// obj[data]="SDasd";


    }

    return (

        <>
        {error}
        <div>
            <div>Username</div>
            <div>
                <input type="text" name="username" onChange={changeHandler}/>

            </div>
        </div>
        <div>
            <div>Password</div>
            <div>
                <input type="password" name="password" onChange={changeHandler}/>
                
            </div>
        </div>

        <div>
            <button onClick={handleSubmit}>Submit</button>
        </div>


        
        </>
    )
}
export default Login;
