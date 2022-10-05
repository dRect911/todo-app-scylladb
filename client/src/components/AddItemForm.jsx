import react, {useState, useEffect} from 'react';


export default function AddItemForm({onItemCreate}){
    const [newItem, setNewItem] = useState('');

    const onChange = (event) => {
        setNewItem(event.target.value);
    };
    
    const onCreate = (event) => {
        event.preventDefault();
        // send a POST request to API and 
        // add the new item to the list
        onItemCreate(newItem);
        setNewItem('');
    };


    return (
        <form onSubmit={onCreate} className="flex items-center mb-1 ">
            <input 
            type="text" 
            placeholder="Add a new item" 
            value={newItem}
            onChange={onChange} 
            className="w-[220px] 2xl:w-[740px] xl:w-[540px] lg:w-[440px] md:w-[340px] sm:w-[270px]
            h-8 border rounded-l bg-slate-100 placeholder:text-slate-300 border-slate-400 hover:bg-gradient-to-r hover:from-slate-200 hover:to-slate-300  hover:placeholder:text-slate-500 focus:ring-opacity-0 focus:border-0 focus:transform-none focus:bg-gradient-to-r focus:from-slate-300 focus:to-slate-300 focus:placeholder:text-slate-500 transition-all">

            </input>
            <button 
                type="submit" 
                disabled={!newItem.length} 
                className="w-[60px] h-8  enabled:hover:from-slate-400 enabled:hover:to-slate-400 enabled:hover:text-sky-100 border border-slate-400 rounded-r bg-gradient-to-r from-slate-300 to-slate-200 text-slate-500 disabled:hover:text-slate-300 disabled:hover:from-slate-100 disabled:hover:to-slate-100 transition-all">
                Add
            </button>
        </form>
    )
}