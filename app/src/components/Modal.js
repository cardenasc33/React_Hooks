//Modal React Component
import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import UserContext from '../context/users/userContext';
import { useModal } from 'react-modal-hook';
import ReactModal from "react-modal";




//Portal allows React components to render in another part of the DOM that is outside of their parent component
//Can mount Modal component to the end of the document.body, rather than as a child of another component
const Modal = () => {
    const userContext = useContext(UserContext);

    const { isShowing, setModal } = userContext;


    if (isShowing) {
        
        return (
        ReactDOM.createPortal(
            <ReactModal isOpen>
             <p>Modal content</p>
                <button onClick={setModal}>Hide modal</button>
                </ReactModal>, document.body
        ) )
    }else{
        return null;
    }
    /*
        if (isShowing) {

        return (
        ReactDOM.createPortal(
        <React.Fragment>
        <div className="modal-overlay"/>
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div className="modal">
                <div className="modal-header">
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={setModal}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <p>
                    Show Modal
                </p>
            </div>
        </div>
    </React.Fragment>, document.body
        ) )
    }else{
        return null;
    }

    */

   
    
    
    
}


export default Modal;