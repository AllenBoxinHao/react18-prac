// import styles from "./ListGroup.module.css";
import { useState } from "react";
import styled from "styled-components";

const List = styled.ul`
    list-style: none;
    padding: 0;
`;

interface ListItemProps {
    active: boolean;
}

const ListItem = styled.li<ListItemProps>`
    padding: 5px 0;
    background: ${(props) => (props.active ? "blue" : "none")};
`;

function ListGroup() {
    const items = ["New York", "San", "Tokyo", "Lon", "Par"];
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <>
            <h1>List</h1>
            <List>
                {items.map((item, index) => (
                    <ListItem
                        active={index === selectedIndex}
                        onClick={() => {
                            setSelectedIndex(index);
                        }}
                        key={item}
                    >
                        {item}
                    </ListItem>
                ))}
            </List>
        </>
    );
}

export default ListGroup;
