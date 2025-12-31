import sass from './myToast.module.sass'

import { useEffect, useRef } from 'react';

import { Toast } from 'primereact/toast';

export const MyToast = () => {
  const toast = useRef(null);

  useEffect(() => {
    toast.current.show({
      severity: 'info',
      summary: 'Интерактивная карта частично устарела',
      life: 5000
    });
  }, []);

  return (<Toast ref={toast} position="bottom-center" className={sass.myToast} />)
}