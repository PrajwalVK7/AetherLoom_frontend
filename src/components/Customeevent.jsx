import React from 'react'
import eventimg from "../assets/event.jpg"
function Customeevent() {
    return (
        <div  style={{ backgroundImage: `url(${eventimg})`, backgroundSize: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundRepeat: 'no-repeat', width: '100%', height: '20rem',flexDirection:'column' }}>

            <h2 className='text-white fw-bolder mb-5 text-center'>Subscribe now to get 10% discound</h2>
            <div className='d-flex '>
                <input type='email' placeholder='abc@gmail.com' className='form-control me-2' />
                <button className='btn btn-primary rounded'>Subscribe</button>
            </div>
        </div>
    )
}

export default Customeevent
