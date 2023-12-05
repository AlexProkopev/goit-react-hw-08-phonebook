import BtnDeletedContact from 'components/BtnDeletedContact/BtnDeletedContact';
import { ModalContactsInfo } from 'components/ModalContactsInfo/ModalContactsInfo';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredContacts } from 'redux/selectors';
import css from './ContactsList.module.css';
import { InfoIcon } from 'components/Contacts/InfoIcon/InfoIcon';
import { isModalOpen } from 'redux/modal/modal.selectors';
import { setDataModal, setModalOpen } from 'redux/modal/modal.reducer';
import dafaultContactImg from "../../img/default_contacts.webp"
import BtnComponent from 'components/BtnComponent/BtnComponent';
import { IconMessage } from 'components/Contacts/IconMessage/IconMessage';

import { setDataMessageModal, setModalMessageOpen } from 'redux/modalMessage/modalMessage.reducer';
import { isModalMessageOpen } from 'redux/modalMessage/modalMessage.selectors';
import ModalMessage from 'components/ModalMessage/ModalMessage';

const ContactsList = () => {
  const getContacts = useSelector(selectFilteredContacts);
  const isOpenModal = useSelector(isModalOpen);
  const isOpenModalMessage = useSelector(isModalMessageOpen);
  const dispatch = useDispatch();
  const sortedContacts = [...getContacts].sort((a, b) =>
    a.name.localeCompare(b.name)
  );



  return (
    <>
      {sortedContacts.map(({ id, name, number }) => {
        return (
          <li className={css.elemContacts} key={id} data-id={id}>
            <img className={css.contactsImg} src={dafaultContactImg} alt="avatar" />
            <p className={css.contactText}>
              {name}: <span className={css.contactTextNumber}>{number}</span>
            </p>
            <div className={css.wrapperBtnModal}>
              <BtnComponent hendlerClick={()=> {
                dispatch(setDataMessageModal({ id, name, number }));
                dispatch(setModalMessageOpen(true));
              }} classNames={"btnOpenMessage"}>
                <IconMessage/>
              </BtnComponent>
              <button
                onClick={() => {
                  dispatch(setModalOpen(true))
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
      {isOpenModalMessage && <ModalMessage />}
    </>
  );
};

export default ContactsList;
