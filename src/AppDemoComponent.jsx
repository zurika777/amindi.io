import {useEffect, useState} from 'react'
export const AppDemoComponent = () => {
    const [visible, setVisible] = useState(true);
    /*const handleClick = useCallback(() => {
        setCount(count + 1);
    },[count]);*/

useEffect(() => {
setTimeout(() => {
setVisible(!visible)
},3000);
},[visible]);
    return (
        <div>
            {visible ?
                ('cx')
            : null
            }

        </div>
    )
};

export default AppDemoComponent;

//TODO useCallBack გაძლევს საშუალებას რომ დაქეშო ფუნქცია
// React useCallbackHook возвращает запоминаемую функцию обратного вызова.
// Одной из причин использования useCallbackявляется предотвращение повторного рендеринга компонента, если его свойства не изменились.