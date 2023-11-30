import css from './Phonebook.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { selectcontatcs } from 'redux/selectors';
import { addContactThunk, fetchContactsList } from 'redux/services';

const Phonebook = () => {
  const contactsRed = useSelector(selectcontatcs);

  const dispatch = useDispatch();

  const handleAddContact = async contacts => {
    
    const hasDuplicatesName = contactsRed.some(
      ({ name }) => name.toLowerCase() === contacts.name.toLowerCase()
    );

    const hasDuplicatesNumber = contactsRed.some(
     
      ({ number }) => number === contacts.number
    );
   if (hasDuplicatesName) {
      alert(`${contacts.name} is already in contacts`);
      return;
    } else if (hasDuplicatesNumber) {
      alert(`${contacts.number} is already in contacts`);
      return;
    }

    const finalContact = {
      id: nanoid(),
      name: contacts.name.charAt(0).toUpperCase() + contacts.name.slice(1),
      number: String(contacts.number),
    };
    await dispatch(addContactThunk(finalContact));
    dispatch(fetchContactsList());
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    const number = e.currentTarget.elements.number.value;
    const name = e.currentTarget.elements.name.value;

    const contacts = {
      name: String(name),
      number: String(number),
    };

    handleAddContact(contacts);

    e.currentTarget.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmitForm}>
      <label className={css.label} htmlFor="name">
        Введете имя
      </label>
      <input
        className={css.input}
        type="text"
        name="name"
        placeholder="Prokopiev Oleksandr"
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <label className={css.label} htmlFor="number">
        Введете Номер
      </label>
      <input
        className={css.input}
        type="tel"
        name="number"
        placeholder='+38 (066) 930 88-25'
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className={css.submitBtn} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default Phonebook;
