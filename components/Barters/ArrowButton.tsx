import React, {useEffect, useRef} from 'react'
import {RiArrowLeftRightLine} from 'react-icons/ri'
import Link from 'next/link'

export const ArrowButton = () => {

  return (
      <Link href='/'>
        <div className="
                arrow-button
                h1
                m-0
                bg-warning-dark
                rounded-circle shadow
                border-2 border-primary
                d-flex flex-column
                justify-content-center
                align-items-center
                "
            data-testid = "ArrowButton"
            data-bs-toggle="tooltip" 
            data-bs-placement="bottom" 
            title="Trade!"
        >
            <RiArrowLeftRightLine/>
        </div>
    </Link>
  )
}
