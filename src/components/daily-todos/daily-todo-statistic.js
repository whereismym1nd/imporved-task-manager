import store from '../../store/store'
import { useSelector } from 'react-redux';
import { selectAll } from './daily-todo-slice';
import Spinner from '../spinner/Spinner';

const DailyTodoStatistic = () => {
    const todos = selectAll(store.getState());
    const completedTodos = todos.filter(todo => todo.completed === true);
    const { todosLoadingStatus } = useSelector(state => state.todos);

    if (todosLoadingStatus === "loading") {
        return <Spinner />;
    } else if (todosLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error</h5>
    }

    return (
        <div className="flex justify-between items-center px-10 py-8 border-2 rounded-3xl border-light w-full mb-8">
            <div className="[&>span]:text-light flex items-center flex-col">
                <span className="text-3xl font-black">Todo Done</span>
                <span className="text-xl">keep it up</span>
            </div>
            <div className="flex-none rounded-full bg-primary w-32 h-32 flex items-center justify-center [&>span]:text-dark">
                <span className="text-dark text-2xl font-bold">{completedTodos.length + "/" + todos.length}</span>
            </div>
        </div>
    )
}

export default DailyTodoStatistic;