import React from 'react'
import Button from 'react-bootstrap/Button';

function CartWishDiv() {
    return (
        <>
            <div className='ms-auto me-2'>
                <button type="button" class="btn btn-primary me-2 ">
                    <i class="fa-solid fa-user"></i>
                </button>
                <button type="button" class="btn btn-primary me-3">
                    <i class="fa-solid fa-heart me-2"></i>
                    <span class="badge text-bg-primary">4</span>
                </button>
                <button type="button" class="btn btn-primary me-3">
                    <i class="fa-solid fa-cart-shopping me-2 "></i>
                    <span class="badge text-bg-primary">4</span>
                </button>
            </div>
        </>
    )
}

export default CartWishDiv
