import react, {useState, useEffect} from 'react';
import axios from 'axios';


export default function TodoList(){
    const [items, setItems] = useState(null);

    useEffect(()=>{
        axios
            .get('http://localhost:5002/api/items')
            .then((res)=> setItems(res.data.items));
    }, []);

    if (items === null) return (<div>loading...</div>)

    return(
    <div>
        {items.map((item) => (
            <div key={item.id} >{item.name}</div>
        ))}
    </div>
    )
}