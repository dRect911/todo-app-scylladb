import react, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark,faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import AddItemForm from './AddItemForm';
import Item from './Item'

// api server url
const BASE_URL = 'http://localhost:5002/api/items'

export default function TodoList(){
    const [items, setItems] = useState(null);

    // fetch items from API
    useEffect(()=>{
        axios
            .get(BASE_URL)
            .then((res)=> setItems(res.data.items));
    }, []);

    // create a new item
    const onItemCreate = async (newItem) => {
        // send a POST request
        const response = await axios.post(BASE_URL, { name: newItem});
        // update our frontend
        setItems([
            ...items, 
            { name: newItem, completed: false, id: response.data.id } 
        ]);
    }

    // delete an item
    const onItemDelete = async (item) =>{
        console.log(item.id);
        // send a DELETE request
        await axios.delete(`${BASE_URL}/${item.id}`);
        //update frontend
        const index = items.findIndex((i) => i.id === item.id);
        console.log(index);
        setItems([...items.slice(0, index),...items.slice(index + 1)]);
    }

    const onItemUpdate = (item) =>{
        
    }

    // loading screen
    if (items === null) return (
        <div className="fixed flex-col w-full h-full flex items-center bg-slate-100 text-sky-600 hover:text-sky-400 ">
            <div className="bg-white p-6 mt-36 border-2 border-slate-300 rounded-xl animate-pulse transition-all">

                <form  className="flex items-center mb-1 ">
                    <input 
                    type="text" 
                    disabled={true}
                    placeholder="Add a new item"  
                    className="w-[220px] 2xl:w-[740px] xl:w-[540px] lg:w-[440px] md:w-[340px] sm:w-[270px]
                     h-8 border rounded-l bg-slate-100 placeholder:text-slate-300 border-slate-400 
                     hover:bg-gradient-to-r hover:from-slate-200 hover:to-slate-300  hover:placeholder:text-slate-500 
                     focus:ring-opacity-0 focus:border-0 focus:transform-none focus:bg-gradient-to-r focus:from-slate-300 focus:to-slate-300 focus:placeholder:text-slate-500 transition-all">

                    </input>
                    <button 
                        type="submit"
                        disabled={true}
                        className="w-[60px] h-8  enabled:hover:from-slate-400 enabled:hover:to-slate-400 enabled:hover:text-sky-100 border border-slate-400 rounded-r bg-gradient-to-r from-slate-300 to-slate-200 text-slate-500 disabled:hover:text-slate-300 disabled:hover:from-slate-100 disabled:hover:to-slate-100 transition-all">
                        Add
                    </button>
                </form>

                {/* item samples */}
                <div key="1" className="w-[280px] 2xl:w-[800px] xl:w-[600px] lg:w-[500px] md:w-[400px] sm:w-[330px]
                 h-8 p-1 flex justify-between items-center border-b border-b-slate-200 hover:bg-slate-100 hover:border-b-slate-400 transition-all ">
                    <div className="flex items-center">
                        <input 
                            type="checkbox" 
                            className="ml-1 rounded checked:bg-stone-400 hover:checked:bg-stone-500 focus:accent-stone-500 hover:border-2 focus:ring-stone-500" >                    
                        </input>
                        <h3 className="ml-2 text-slate-500 " > Do something </h3>
                    </div>                
                    <FontAwesomeIcon  className="pr-2 opacity-0 hover:opacity-100 text-red-600 transition-all" icon={faXmark} />                
                </div>

                <div key="2" className="w-[280px] 2xl:w-[800px] xl:w-[600px] lg:w-[500px] md:w-[400px] sm:w-[330px]
                 h-8 p-1 flex justify-between items-center border-b border-b-slate-200 hover:bg-slate-100 hover:border-b-slate-400 transition-all ">
                    <div className="flex items-center">
                        <input 
                            type="checkbox" 
                            className="ml-1 rounded checked:bg-stone-400 hover:checked:bg-stone-500 focus:accent-stone-500 hover:border-2 focus:ring-stone-500" >                    
                        </input>
                        <h3 className="ml-2 text-slate-500 " > Do something </h3>
                    </div>                
                    <FontAwesomeIcon  className="pr-2 opacity-0 hover:opacity-100 text-red-600 transition-all" icon={faXmark} />                
                </div>

                <div key="3" className="w-[280px] 2xl:w-[800px] xl:w-[600px] lg:w-[500px] md:w-[400px] sm:w-[330px]
                 h-8 p-1 flex justify-between items-center border-b border-b-slate-200 hover:bg-slate-100 hover:border-b-slate-400 transition-all ">
                    <div className="flex items-center">
                        <input 
                            type="checkbox" 
                            className="ml-1 rounded checked:bg-stone-400 hover:checked:bg-stone-500 focus:accent-stone-500 hover:border-2 focus:ring-stone-500" >                    
                        </input>
                        <h3 className="ml-2 text-slate-500 " > Do something </h3>
                    </div>                
                    <FontAwesomeIcon  className="pr-2 opacity-0 hover:opacity-100 text-red-600 transition-all" icon={faXmark} />                
                </div>    

            </div>
            <h3 className="text-sky-600 mt-24  text-xl transition-all" >

                
                <FontAwesomeIcon  className=" lg:text-[40px]  text-slate-500 animate-spin transition-all" icon={faSpinner} />
            </h3> 
        </div>
    );

    //main app screen
    return(
    <div className="flex flex-col bg-slate-100 items-center w-full h-full fixed ">

        <div className="bg-white p-6 mt-36 sm:mx-8 border-2 border-slate-300 rounded-xl transition-all">
            <AddItemForm onItemCreate={onItemCreate} onItemUpdate={onItemUpdate} />

            {items.map((item) => (
                <Item key={item.id} item={item} onItemDelete={onItemDelete} />            
            ))}

        </div>

        

    </div>


    )
}

