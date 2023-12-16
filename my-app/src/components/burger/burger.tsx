import styles from './burger.module.scss'

const Burger = () =>{

    const toogleClass = () =>{
        const elements = document.getElementsByClassName('line');
        console.log('elemnts', [...elements]);
        [...elements].forEach((element)=>{
          element.classList.toggle(styles.active)
        })
        };
        return(
            <div className={styles.burger} onClick={toogleClass}>
                <span className={[styles.line, "line"].join(" ")}></span>
                <span className={[styles.line, "line"].join(" ")}></span>
                <span className={[styles.line, "line"].join(" ")}></span>
            </div>
        )
}

export default Burger