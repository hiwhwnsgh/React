//import useInputs from "./useInputs";
import { useState } from "react";
const Info = () =>{
    const [name,setName] = useState('');
    const [nickname,setNickName] = useState('');

    const onChange = e => {
        setName(e.target.value)
    }

    const onChangeNickName = e => {
        setNickName(e.target.value)
    }

    return (
        <div>
            <div>
                <input name ="name" value={name} onChange={onChange}></input>
                <input name ="nickname" value={nickname} onChange={onChangeNickName}/>
            </div>
            <div>
                <div>
                    <b>이름: </b> {name}
                </div>
                <div>
                    <b>닉네임:</b>{nickname}
                </div>
            </div>
        </div>
    )
}
export default Info;