import sass from './myTooltip.module.sass'

import { Tooltip } from 'primereact/tooltip';

export default function MyTooltip({ ...props }) {
  return (<Tooltip className={sass.myToolyip} {...props} />)
}