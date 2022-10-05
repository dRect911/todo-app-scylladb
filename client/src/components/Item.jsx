import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Item({item, onItemDelete, onItemUpdate}){
    const [completed, setCompleted] = useState(item.completed);
    // console.log(completed)

    const onDelete = () => {
        onItemDelete(item)
    }

    const toggleCompletion = () => {
        // handle completion here
        // onItemUpdate(item);
        setCompleted(!completed);
    }


    if (!completed){
        return(
            <div key={item.id} className="w-[280px] 2xl:w-[800px] xl:w-[600px] lg:w-[500px] md:w-[400px] sm:w-[330px]
                h-8 p-1 flex justify-between items-center border-b border-b-slate-200 hover:bg-slate-100 hover:border-b-slate-400 transition-all ">
                <div className="flex items-center">
                    <input 
                        type="checkbox" 
                        checked={completed}
                        onChange={toggleCompletion}
                        className="ml-1 rounded checked:bg-stone-400 hover:checked:bg-stone-500 focus:accent-stone-500 hover:border-2 focus:ring-stone-500" >                    
                    </input>
                    <h3 className="ml-2" >{item.name}</h3>
                </div>
                
                <FontAwesomeIcon onClick={onDelete} className="pr-2 opacity-0 hover:opacity-100 text-red-600 transition-all" icon={faXmark} />

                {/* <h3 onClick={onDelete} className="opacity-0 hover:opacity-100 text-sky-500 pr-2 transition-all">Done</h3>
                <input type="checkbox"></input> */}
            </div>
        )
    }
    else if (completed){
        return(
            <div key={item.id} className="w-[280px] 2xl:w-[800px] xl:w-[600px] lg:w-[500px] md:w-[400px] sm:w-[330px]
             h-8 p-1 flex justify-between items-center bg-stone-100 border-b border-b-stone-200 hover:bg-slate-100 hover:border-b-slate-400 transition-all ">
                <div className="flex items-center">
                    <input 
                        type="checkbox" 
                        checked={completed}
                        onChange={toggleCompletion}
                        className="ml-1 rounded checked:bg-stone-400 hover:checked:bg-stone-500 focus:checked:bg-stone-500 hover:border-2 focus:ring-stone-500 " >                    
                    </input>
                    <h3 className="ml-2 text-stone-400 " >{item.name}</h3>
                </div>
                
                

                {/* <h3 className="text-red-600 pr-2">Done</h3> */}
            </div>
        )
    }   
}


