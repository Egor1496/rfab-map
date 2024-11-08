import sass from './tmp.module.sass'

export const Tmp = ({ children, ...props }) => {
  return (
    <div className={sass.myTmp} {...props}>

    </div>
  )
}