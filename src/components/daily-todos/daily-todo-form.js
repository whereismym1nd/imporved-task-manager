import { useState } from "react";
import { todoCreated } from "./daily-todo-slice";
import { v4 } from "uuid";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch } from "react-redux";

const DailyTodoForm = () => {
    const [value, setValue] = useState('')
    const { request } = useHttp();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        if (e.key !== "Enter") {
            e.preventDefault()
        };

        if (value !== '') {
            const newTodo = {
                id: v4(),
                title: value,
                completed: false
            }
            request("http://localhost:3001/todos", "POST", JSON.stringify(newTodo))
                .then(dispatch(todoCreated(newTodo)))
                .catch(err => console.log(err));

            setValue('');
        }

    }

    return (
        <div className="flex justify-between items-center rounded-3xl w-full mb-8">
            <form className="w-full flex" onSubmit={handleSubmit}>
                <input onKeyDown={e => e.key === "Enter" ? handleSubmit : null} value={value} onChange={e => setValue(e.target.value)} type="text" className="w-full rounded-2xl h-12 px-5 bg-gray placeholder-light" placeholder="Enter your todo here..." />
                <button className="flex-none w-12 h-12 border border-transparent ml-4 rounded-full shadow-sm text-2xl text-dark font-black bg-primary ">+</button>
            </form>
        </div>
    )

}

export default DailyTodoForm;