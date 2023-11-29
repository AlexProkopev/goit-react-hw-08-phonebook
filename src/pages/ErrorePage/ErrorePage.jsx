import React from 'react'
import css from "./ErrorePage.module.css"

const ErrorePage = () => {
  return (
    <div className={css.wrapperErrore}>
        <h2 className={css.erroreTitle}>Мы не нашли эту страницу. Заблудились? Скорее возвращайтесь в ленту.</h2>
        <img className={css.imageErrore} src="https://s3.dzeninfra.ru/zen/images/page%20404/travel_404.png" alt="Errore" />
        </div>
  )
}

export default ErrorePage