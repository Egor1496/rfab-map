import sass from './myAccordion.module.sass'

import { Accordion } from 'primereact/accordion';

export const MyAccordion = ({ children, sassProps, ...props }) => {
  return (
    <Accordion className={sass.myAccordion + " " + (sassProps || "")} {...props}>
      {children}
    </Accordion>
  )
}