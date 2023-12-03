import React from "react";
import styles from './styles.module.scss'
import flags from "../../constants/flags";
import styled from 'styled-components'

const StyledImgWrap = styled.div`
    width: ${props => props.$width || 15}px;
`;

const CurrencyFlag = (props) => {
    const {
        currency,
        width
    } = props
    return (
        <StyledImgWrap $width={width} className={styles["currency-flag"]}>
            <img src={flags[currency.toLowerCase()]} alt="Currency flag" />
        </StyledImgWrap>
    )
}

export default CurrencyFlag