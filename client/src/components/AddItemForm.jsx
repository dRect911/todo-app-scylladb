import react, {useState, useEffect} from 'react';


export default function AddItemForm(){
    return (
        <div className="flex items-center ">
            <input type="text" placeholder="Add a new item" className="w-[300px] h-8 border rounded-l bg-slate-100 border-slate-300 hover:border-slate-500 transition-all"></input>
            <button type="submit" text="Add" className="w-[60px] h-8 bg-white text-sky-500 border border-sky-500 rounded-r hover:bg-sky-500 hover:text-white hover:border-sky-700 transition-all">Add</button>
        </div>
    )
}