import DailyTodoList from "./daily-todo-list";
import DailyTodoForm from "./daily-todo-form";
import DailyTodoStatistic from "./daily-todo-statistic";

const DailyTodo = () => {



    return (
        <div className="flex bg-dark w-1/4 rounded-3xl p-10 flex-col items-center">
            <DailyTodoStatistic />
            <DailyTodoForm />
            <DailyTodoList />
        </div>
    )
}

export default DailyTodo;