// import { log } from 'console';
// import styles from './burger.module.scss'

// interface BurgerProps{
//  onClick: () => void;
//  isOpened: boolean;
// }

// const Burger = (props:BurgerProps) =>{

//     const toogleClass = () =>{
//         const elements = document.getElementsByClassName('line');
//         [...elements].forEach((element)=>{
//           element.classList.toggle(styles.active)
//         })
//         console.log(111);
        
//         };
//         return(
//             <div className={styles.burger} onClick={toogleClass}>
//             <span className={[styles.line, props.isOpened ? styles.active : ""].join(" ")}></span>
//             <span className={[styles.line, props.isOpened ? styles.active : ""].join(" ")}></span>
//             <span className={[styles.line, props.isOpened ? styles.active : ""].join(" ")}></span>
//             </div>
//         )
// }

// export default Burger

import { log } from 'console';
import styles from './burger.module.scss'

interface BurgerProps{
 onClick: () => void;
 isOpened: boolean;
}

const Burger = (props: BurgerProps) =>{

    const toggleClass = () =>{
        props.onClick();
    };
    
    const lineClassName = props.isOpened ? `${styles.line} ${styles.active}` : styles.line;
    
    return(
        <div className={styles.burger} onClick={toggleClass}>
            <span className={lineClassName}></span>
            <span className={lineClassName}></span>
            <span className={lineClassName}></span>
        </div>
    )
}

export default Burger