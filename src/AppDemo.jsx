import {useEffect, useCallback, useRef, useState} from 'react'
export const AppDemo = () => {
    const simple = useRef();
    const [count, setCount] = useState(0);
    const handleClick = useCallback(() => {
        setCount(count + 1);
    },[count]);

    useEffect(() => {
        console.log(simple.current); //TODO current მიმდინარე. ნებისმიერ Ref - რეფერენტს აქვს  current
        console.log(simple);
        console.log(document.getElementById('simple'));
        if (count === 0) {
            return () => {}

        }
        console.log('useEffect');
    },[count, simple]);
    return (
        <div>
           <button ref={simple} id="simple" onClick= {
               () => {
                   setCount(count + 1)
               }
           } >
               Click me {count}
           </button>
        </div>
    )
};

export default AppDemo;