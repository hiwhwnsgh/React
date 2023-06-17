
const Test = () =>{

    const onChange = e =>{
        console.log(e.target.value);
        
    }
    return(
        <div>
            <input  onChange={onChange}></input>
        </div>
    )
}

export default Test;