//Custom Modal Hook

import { useState } from 'react';
import UserContext from '../context/users/userContext';


const useModal = () => {
    const[isShowing, setIsShowing] = useState(false);

    function setModal() {
        setIsShowing(!isShowing);
    }

    return {
        isShowing,
        setModal,
    }
};

export default useModal;