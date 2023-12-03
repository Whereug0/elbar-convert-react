import React from "react";
import styles from './styles.module.scss'
import Select from "react-select";
import clsx from "clsx";
import CurrencyFlag from '../currency-flag/index'

const CurrencySelect = (props) => {
    const {
        value,
        onChange,
        options,
        label,
        className,
        disabled
    } = props
    
    const selectClassnames = clsx (
        styles['select-wrap'],
        className
    )

const formatOptionLabel = (option) => {
    return (
        <div className={styles["custom-option"]}>
            <CurrencyFlag currency={option.value}/>
            <div className="label">{option.label}</div>
        </div>
    )
}

    return (
        <div className={selectClassnames}>
            {label && (
                <span className={styles["label"]}>
                    {label}
                </span>
            )}
            <Select
                classNamePrefix='custom-select'
                value = {value}
                onChange = {onChange}
                options = {options}
                placeholder = 'USD'
                isDisabled = {disabled}
                formatOptionLabel={formatOptionLabel}
            />
        </div>
    )
}

export default CurrencySelect