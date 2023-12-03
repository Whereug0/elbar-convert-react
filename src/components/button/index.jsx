import React from "react";
import styles from './styles.module.scss'
import clsx from "clsx";


const Button = (props) => {
    const {
        children,
        className,
        onClick,
        type = 'button',
        disabled
    } = props

    const mainClasses = clsx(
        styles.button,
        className
    )

    return (
        <button disabled={disabled}
        onClick={onClick} type={type} className={mainClasses}>
            {children}
        </button>
    )
}

export default Button