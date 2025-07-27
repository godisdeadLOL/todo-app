import store from "@/app/store"
import TodoGroupList from "@/features/todos/components/TodoGroupList"
import { Provider } from "react-redux"

export default function App() {
	return (
		<Provider store={store}>
			<TodoGroupList />
		</Provider>
	)
}
