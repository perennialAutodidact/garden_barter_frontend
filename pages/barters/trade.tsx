import React from 'react'
import BarterDetail from '../../components/Barters/BarterDetail'
import { useProtectedRouter } from '../../hooks/useProtectedRouter'

const BarterTradePage = () => {
  const {router} = useProtectedRouter()
  return (
    <div>
        <BarterDetail />
    </div>
  )
}

export default BarterTradePage