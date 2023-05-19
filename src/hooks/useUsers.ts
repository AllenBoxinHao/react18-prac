import { useEffect, useState } from "react";
import userService, { User } from "../services/userService";
import { CanceledError } from "../services/api-client";

const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [err, setErr] = useState<string>("");
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const { request, cancel } = userService.getAll<User>();
        request
            .then((res) => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setErr(err.message);
                setLoading(false);
            });

        return () => cancel();
    }, []);
    return { users, err, isLoading, setUsers, setErr };
};

export default useUsers;
