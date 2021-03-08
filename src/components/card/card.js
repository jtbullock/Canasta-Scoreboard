import styles from './card.module.css';
import propTypes from 'prop-types';

export function Card({children})
{
    return (
        <div className={styles.Card}>
            {children}
        </div>
    );
}

Card.propTypes = {
    children: propTypes.node
};

export function CardTitle({children, style})
{
    return (
        <div className={styles.CardTitle} style={style}>
            {children}
        </div>
    );
}

CardTitle.propTypes = {
    children: propTypes.node,
    style: propTypes.object
};

export function CardBody({children})
{
    return (
        <div className={styles.CardBody}>
            {children}
        </div>
    );
}

CardBody.propTypes = {
    children: propTypes.node
};