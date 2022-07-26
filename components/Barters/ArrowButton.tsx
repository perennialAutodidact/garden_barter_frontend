import React, {useEffect, useRef} from 'react'
import {RiArrowLeftRightLine} from 'react-icons/ri'
import Link from 'next/link'
import { Barter } from '../../ts/interfaces/barters'

interface ArrowButtonProps {
    hrefUrl: string,
    barter: Barter
}

export const ArrowButton = ({hrefUrl, barter}:ArrowButtonProps) => {
    const {barterType, uuid:barterId } = barter
  return (
      <Link href={{
        pathname: `${hrefUrl}/[barterType]/[barterId]`,
        query: {barterType, barterId}
      }}>
        <div className="
                arrow-button
                h2
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
