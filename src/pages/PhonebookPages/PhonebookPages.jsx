import React from 'react'
import css from "./PhonebookPages.module.css"
import { PhoneLogo } from 'components/Phonebook/PhoneLogo/PhoneLogo'
import Phonebook from 'components/Phonebook/Phonebook'
import { ContactsIcon } from 'components/Contacts/ContactsIcon/ContactsIcon'
import Filters from 'components/Filters/Filters'
import { useSelector } from 'react-redux'
import { selectErrore, selectcontatcs } from 'redux/selectors'
import Contacts from 'components/Contacts/Contacts'

const PhonebookPages = () => {

    const contactsRedux = useSelector(selectcontatcs);
    const errore = useSelector(selectErrore);
  return (
    <> <h1 className={css.title}>
    Phonebook <PhoneLogo />
  </h1>
  <Phonebook />

  <h2 className={css.title}>
    Contacts <ContactsIcon />
  </h2>
  <div className={css.filterContainer}>{contactsRedux.length > 0 && <Filters />}</div>
  {!contactsRedux.length && errore === null && <h2>Создайте контакт</h2>}
  <Contacts /></>
  )
}

export default PhonebookPages