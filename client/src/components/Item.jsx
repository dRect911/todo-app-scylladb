export default function Item(props){
    const completed = props.completed
    // console.log(completed)

    if (completed){
        return(
            <div key={props.id} className="w-[360px] h-8 p-1 border-b border-b-slate-200 hover:bg-slate-100 hover:border-b-slate-400 transition-all ">
                <h3>{props.name}</h3>
            </div>
        )
    }
    else if (!completed){
        return(
            <div key={props.id} className="w-[360px] h-8 p-1 bg-stone-100 border-b border-b-stone-200 hover:bg-slate-100 hover:border-b-slate-400 transition-all ">
                <h3 className="text-stone-400 " >{props.name}</h3>
            </div>
        )
    }

    
}