import "./App.css";
import useUsers from "./hooks/useUsers";
// import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
// import ExpenseForm from "./expense-tracker/components/ExpenseForm";
// import ExpenseList from "./expense-tracker/components/ExpenseList";
import userService, { User } from "./services/userService";

function App() {
    // const [selectedCategory, setSelectedCategory] = useState("");
    // const [expenses, setExpenses] = useState([
    //     { id: 1, description: "car", amount: 200, category: "Entertainment" },
    //     { id: 2, description: "bread", amount: 4, category: "Groceries" },
    //     { id: 3, description: "milk", amount: 8.5, category: "Groceries" },
    //     { id: 4, description: "electricity", amount: 120, category: "Utilities" },
    // ]);

    // const visibleExpenses = selectedCategory ? expenses.filter((e) => e.category === selectedCategory) : expenses;

    // return (
    //     <div className="mx-4 mt-3">
    //         <div className="mb-5">
    //             <ExpenseForm
    //                 onSubmit={(expense) => setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])}
    //             />
    //         </div>
    //         <div className="mb-3">
    //             <ExpenseFilter onSelectCategory={(category) => setSelectedCategory(category)} />
    //         </div>
    //         <ExpenseList
    //             expenses={visibleExpenses}
    //             onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
    //         />
    //     </div>
    // );
    const { users, err, isLoading, setUsers, setErr } = useUsers();

    const deleteUser = (user: User) => {
        const originalUsers = [...users];
        setUsers(users.filter((u) => u.id !== user.id));
        userService.delete(user.id).catch((err) => {
            setErr(err.message);
            setUsers(originalUsers);
        });
    };

    const addUser = () => {
        const originalUsers = [...users];

        const newUser = { id: 0, name: "Allen" };
        setUsers([newUser, ...users]);

        userService
            .create(newUser)
            .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
            .catch((err) => {
                setErr(err.message);
                setUsers(originalUsers);
            });
    };

    const updateUser = (user: User) => {
        const originalUsers = [...users];

        const updatedUser = { ...user, name: user.name + "!" };
        setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

        userService.update(updatedUser).catch((err) => {
            setErr(err.message);
            setUsers(originalUsers);
        });
    };

    return (
        <div className="mx-4 mt-3">
            {err && <p className="text-danger">{err}</p>}
            {isLoading && <div className="spinner-border"></div>}
            <button className="btn btn-primary mb-3" onClick={addUser}>
                Add
            </button>
            <ul className="list-group">
                {users.map((user) => (
                    <li key={user.id} className="list-group-item d-flex justify-content-between">
                        {user.name}
                        <div>
                            <button className="btn btn-outline-secondary mx-1" onClick={() => updateUser(user)}>
                                Update
                            </button>
                            <button className="btn btn-outline-danger" onClick={() => deleteUser(user)}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
