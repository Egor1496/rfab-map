import sass from './instructions.module.sass'

export const Instructions = ({ children, ...props }) => {
  return (
    <div className={sass.instructions} {...props}>
      Подсказки
    </div>
  )
}