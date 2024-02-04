import { todoEdited, todoDeleted } from "./daily-todo-slice";
import { useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { useState, useEffect } from "react";

const DailyTodoListItem = (props) => {
    const { item, circleClassName, titleClassName } = props;
    const dispatch = useDispatch();
    const { request } = useHttp();

    const [showEdit, setShowEdit] = useState(false);

    const [todoTitle, setTodoTitle] = useState(item.title);
    const [todoCompleted, setTodoCompleted] = useState(item.completed);


    const deleteTodo = (id) => {
        request(`http://localhost:3001/todos/${id}`, "DELETE")
            .then(() => {
                dispatch(todoDeleted(id));
            })
            .catch(err => console.log(err));
    }


    const onEditFocusOut = (value) => {
        setShowEdit(false);
        setTodoTitle(value);
    }


    useEffect(() => {
        const { id, ...newItem } = item;

        const updatedItem = {
            id,
            changes: { ...newItem, title: todoTitle, completed: todoCompleted }
        };

        request(`http://localhost:3001/todos/${item.id}`, "PATCH", JSON.stringify(updatedItem.changes))
            .then(() => {
                dispatch(todoEdited(updatedItem));
            })
            .catch(err => console.log(err));
    }, [todoTitle, todoCompleted])



    return (
        <div className="flex justify-between items-center w-full bg-gray border-light border-2 rounded-xl p-4 mb-4 ">
            <div className="cursor-pointer">
                <div onClick={() => setTodoCompleted(state => !todoCompleted)} className={circleClassName}>
                </div>
            </div>

            {
                showEdit ? <EditTitle todoTitle={todoTitle} onEditFocusOut={onEditFocusOut} item={item} titleClassName={titleClassName} /> : <ShowTitle todoTitle={todoTitle} item={item} titleClassName={titleClassName} />
            }


            <div className="flex ml-auto w-1/5 justify-between flex-none">
                <div className="cursor-pointer" onClick={() => { setShowEdit(true) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-7 h-7 fill-light">
                        <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                    </svg>
                </div>
                <div className="cursor-pointer" onClick={() => { deleteTodo(item.id) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-7 h-7 fill-light">
                        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
        </div>
    )

}

const EditTitle = (props) => {
    const [editInput, setEditInput] = useState(props.todoTitle);
    return (
        <input autoFocus type="text" value={editInput} onBlur={e => props.onEditFocusOut(e.target.value)} onChange={(e) => { setEditInput(e.target.value) }} className="text-xl font-semibold text-light break-all mx-4 bg-dark max-w-52 pl-2"></input>
    )
}

const ShowTitle = (props) => {
    return (
        <div className={props.titleClassName}>{props.todoTitle}</div>
    )
}

export default DailyTodoListItem;