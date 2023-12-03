import React from "react";
import styles from './style.module.scss'
import clsx from "clsx";


function Input(props) {
    const {
        label,
        value,
        onChange,
        className,
        disabled
    } = props

    const InputClassnames = clsx (
        styles['amount-wrap'],
        className
    )
    return (
        <div className={InputClassnames}>
            {label && (
                <span className={styles["label"]}>
                    {label}
                </span>
            )}
            <input 
            className={styles["input"]}
            value={value}
            onChange={onChange}
            type="text" 
            disabled={disabled}
            />
            
        </div>
        
    )
}


export default Input