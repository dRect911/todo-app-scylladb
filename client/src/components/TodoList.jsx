import react, {useState, useEffect} from 'react';
import axios from 'axios';
import AddItemForm from './AddItemForm';
import Item from './Item'


export default function TodoList(){
    const [items, setItems] = useState(null);

    useEffect(()=>{
        axios
            .get('http://localhost:5002/api/items/dummy')
            .then((res)=> setItems(res.data.items));
    }, []);

    if (items === null) return (<div>loading...</div>)

    return(
    <div className="p-10 flex-col">
        <AddItemForm />

        {/* <Item name="Call Bob" />
        <Item name="Kill Bob" />
        <Item name="Burry Bob" /> */}

        {items.map((item) => (
        
        <Item id={item.id} name={item.name} completed={item.completed} />
            
        ))}

        {/* <div key={item.id} >{item.name}</div> */}

    </div>


    )
}

