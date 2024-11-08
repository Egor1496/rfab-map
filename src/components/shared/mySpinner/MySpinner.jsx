import sass from './mySpinner.module.sass'

import { ProgressSpinner } from 'primereact/progressspinner'

export const MySpinner = () => {
  return (
    <div className={sass.mySpinner}>
      <ProgressSpinner
        style={{ width: '70px', height: '70px' }}
        strokeWidth="4"
        fill="transparent"
        animationDuration="1s"
      />
    </div>
  )
}