import { useSelector, useDispatch } from "react-redux";
import { todosFetched, todosFetching, todosFetchingError, fetchTodos, selectAll } from "./daily-todo-slice";
import store from '../../store/store'
import { useEffect } from "react";
import Spinner from "../../components/spinner/Spinner";
import DailyTodoListItem from "./daily-todo-item";

const DailyTodoList = () => {
    const todos = selectAll(store.getState());
    const dispatch = useDispatch();
    const { todosLoadingStatus } = useSelector(state => state.todos);

    useEffect(() => {
        dispatch(fetchTodos())
    }, [])


    if (todosLoadingStatus === "loading") {
        return <Spinner />;
    } else if (todosLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error</h5>
    }

    const renderTodos = () => {
        return todos.map((todo) => {

            let circleClassName = "rounded-full border-2 border-primary w-8 h-8 ";
            let titleClassName = "text-xl font-semibold text-light break-all mx-4 "

            if (todo.completed === true) {
                circleClassName = "rounded-full border-2 bg-lime-500 border-lime-500 w-8 h-8"
                titleClassName += "line-through"
            }

            return (
                <DailyTodoListItem key={todo.id} circleClassName={circleClassName} titleClassName={titleClassName} item={todo} />
            )
        })
    };

    const content = renderTodos(todos);

    return (
        <div className="flex flex-col w-full">
            {content}
        </div>
    )
}

export default DailyTodoList;