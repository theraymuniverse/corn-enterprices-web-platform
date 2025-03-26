import React from 'react'

const cartItem = (props) => {
    const {id, name, imageUrl , price } = props.data
    return (
    <div>
       <img src={imageUrl} />
       <div>
        <p>{name}</p>
        <p>{price}</p>
       </div>
    </div>
  )
}

export default cartItem