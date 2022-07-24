import React, {useEffect, useRef} from 'react'
import {RiArrowLeftRightLine} from 'react-icons/ri'
import Link from 'next/link'

interface ArrowButtonProps {
    hrefUrl: string
}

export const ArrowButton = ({hrefUrl}:ArrowButtonProps) => {
  return (
      <Link href={hrefUrl}>
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
            data-bs-placement="top" 
            title="Trade!"
        >
            <RiArrowLeftRightLine/>
        </div>
    </Link>
  )
}
