import React, { forwardRef, useEffect, useRef } from 'react'
import { RiArrowLeftRightLine } from 'react-icons/ri'
import Link from 'next/link'
import { Barter } from '../../ts/interfaces/barters'

interface IconButtonProps {
    icon: React.ReactNode
}
const IconButton = forwardRef(({icon }: IconButtonProps, {onClick, href}, ref) => {
    return (
        <a className="
            icon-button
            h2
            m-0
            bg-warning-dark
            rounded shadow
            border-2 border-primary
            d-flex flex-column
            justify-content-center
            align-items-center
            w-100
            link-dark
        "
        data-testid="IconButton"
        title="Trade!"
    >
        {icon}
    </a>

    )
IconButton.displayName = 'IconButton'
})

export default IconButton