import { useEffect, useState } from 'react';
import sass from './myModal.module.sass'

export const MyModal = ({
  title,
  position = "center",
  children,
  selectVisible,
  dispatchVisible,
}) => {

  const [opacity, setOpacity] = useState(selectVisible); // Для анимации opacity.
  const [visible, setVisible] = useState(selectVisible); // Для z-index.

  const classNames = [
    sass.myModal,
    opacity ? sass.opacity : "",
    visible ? sass.visible : "",
  ];

  useEffect(() => {
    setOpacity(selectVisible);

    selectVisible ? setVisible(true) : setTimeout(() => { setVisible(false) }, 300);

  }, [selectVisible]);

  return (
    <div className={classNames.join(" ")}>
      <div
        className={sass.modalMask}
        onClick={() => dispatchVisible(false)}
      />

      <div className={sass.modalContent + " " + sass[position]}>
        {title && <div className={sass.title}>{title}</div>}
        {children}
      </div>
    </div>
  )
}