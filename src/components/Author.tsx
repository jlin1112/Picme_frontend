import React from 'react'
import { useState } from 'react'
import module from './css/Author.module.css'

export default function Author () {
    // const [feedback, setFeedback] = useState('')

    // const [error, setError] = useState(false)

    // function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    //     e.preventDefault()
    //     if(!feedback){
    //         setError(true)
    //     } else {
    //         // console.log(feedback)
    //     }
    // }

   
    
    return(
        <div className={module.container}>
        <form 
        // onSubmit={(e) => handleSubmit(e)}
        >
            <h1>About the Developer</h1>
            <h2><i>Jiahao Wesley Lin</i></h2>
            <h2><i>jiahaolin96@gmail.com</i></h2>
            {/* <h2>Please tell me your experience of using <i>Picme</i> !</h2>
            <textarea name="feedback" id="feedback" cols={30} rows={5} onChange={(e) => {
                setError(false)
                setFeedback(e.target.value)
            }}></textarea>
            {error && <p> <i style={{ color: "#DB5F58" }}>Feedback can not be empty!</i></p>}
            <button type='submit'>Submit</button> */}
        </form>
        </div>
    )
}