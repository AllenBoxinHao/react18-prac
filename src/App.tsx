import { useEffect, useState } from "react";
import "./App.css";
// import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
// import ExpenseForm from "./expense-tracker/components/ExpenseForm";
// import ExpenseList from "./expense-tracker/components/ExpenseList";
import axios, { AxiosError } from "axios";

interface User {
    id: number;
    name: string;
}

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
    const [users, setUsers] = useState<User[]>([]);
    const [err, setErr] = useState<string>("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get<User[]>("https://jsonplaceholder.typicode.com/users");
                setUsers(res.data);
            } catch (err) {
                setErr((err as AxiosError).message);
            }
        };
        fetchUsers();
    }, []);

    return (
        <>
            {err && <p className="text-danger">{err}</p>}
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </>
    );
}

export default App;
