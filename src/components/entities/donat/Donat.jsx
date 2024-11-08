import sass from './donat.module.sass'

export const Donat = ({ children, ...props }) => {
  return (
    <div className={sass.donat} {...props}>
      Донат
    </div>
  )
}