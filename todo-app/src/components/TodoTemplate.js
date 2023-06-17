import './TodoTemplate.scss';

const Todotemplate = ({children}) =>{
    return(
        <div className="TodoTemplate">
            <div className="app-title">일정관리</div>
            <div className="content">{children}</div>
        </div>
    )
}

export default Todotemplate;