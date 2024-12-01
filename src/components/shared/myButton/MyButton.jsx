import sass from './myButton.module.sass'

export const MyButton = ({ children, iconType, bcolor, color, ...props }) => {

  const urlIcon = "/rfab-map/assets/images/ui/right-menu/"

  return <button
    className={sass.myButton}
    style={{ color: color, borderColor: bcolor, }}
    {...props}
  >
    {
      iconType && <div
        className={sass.icon}
        style={{ backgroundImage: `url(${urlIcon + iconType}.svg` }}
      />
    }

    <div className={sass.label}>{children}</div>

    {
      iconType && <div
        className={sass.icon}
        style={{ backgroundImage: `url(${urlIcon + iconType}.svg` }}
      />
    }
  </button>
}