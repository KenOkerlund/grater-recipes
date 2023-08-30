const AlterQuantity = ({recipe}) => {
    // WHat you need to do is make 1x the default and then have it display 1/2/3 times the state.quantity.quantity * those values. Render this content instead of the state content!

const defaultQuantityHandler = () => {

}

const doubleQuanityHandler = () => {

}

const tripleQuantityHandler = () => {

}

    return (
        <div className='recipe-alter-quantity'>
            <button className='math-button' onClick={defaultQuantityHandler}>1x</button>
            <button className='math-button' onClick={doubleQuanityHandler}>2x</button>
            <button className='math-button' onClick={tripleQuantityHandler}>3x</button>
        </div>
    )
}

export default AlterQuantity;