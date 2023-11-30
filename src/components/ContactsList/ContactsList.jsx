import BtnDeletedContact from 'components/BtnDeletedContact/BtnDeletedContact';
import { ModalContactsInfo } from 'components/ModalContactsInfo/ModalContactsInfo';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredContacts } from 'redux/selectors';
import css from './ContactsList.module.css';
import { InfoIcon } from 'components/Contacts/InfoIcon/InfoIcon';
import { isModalOpen } from 'redux/modal/modal.selectors';
import { setDataModal, setModalOpen } from 'redux/modal/modal.reducer';

const ContactsList = () => {
  const getContacts = useSelector(selectFilteredContacts);
  const isOpenModal = useSelector(isModalOpen);
  const dispatch = useDispatch();
  const sortedContacts = [...getContacts].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const openModal = () => {
    dispatch(setModalOpen(true));
  };

  return (
    <>
      {sortedContacts.map(({ id, name, number }) => {
        return (
          <li className={css.elemContacts} key={id} data-id={id}>
            <p className={css.contactText}>
              {name}: <span className={css.contactTextNumber}>{number}</span>
            </p>
            <div className={css.wrapperBtnModal}>
              <button
                onClick={() => {
                  openModal();
                  dispatch(setDataModal({ id, name, number }));
                }}
                className={css.btnOpenModal}
              >
                <InfoIcon />
              </button>

              <BtnDeletedContact idCurrent={id} />
            </div>
          </li>
        );
      })}
      {isOpenModal && <ModalContactsInfo />}
    </>
  );
};

export default ContactsList;
