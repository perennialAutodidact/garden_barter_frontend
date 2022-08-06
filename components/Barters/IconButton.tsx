import React, { useEffect, useRef } from 'react'
import { RiArrowLeftRightLine } from 'react-icons/ri'
import Link from 'next/link'
import { Barter } from '../../ts/interfaces/barters'

interface IconButtonProps {
    icon: React.ReactNode
}

const IconButton = ({ icon }: IconButtonProps) => {
    return (
        <div className="
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
        "
        data-testid="IconButton"
        title="Trade!"
    >
        {icon}
    </div>

    )
}

export default IconButton