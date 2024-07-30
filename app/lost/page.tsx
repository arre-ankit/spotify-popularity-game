import Lost from '@/components/Lost'
import React from 'react'

type Props = {}
export const runtime = 'edge'

const page = (props: Props) => {
  return (
    <div>
        <Lost />
    </div>
  )
}

export default page