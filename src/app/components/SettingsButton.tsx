import React, { useState } from 'react';
import settingsimg from '../images/settings.svg';
import Image from 'next/image';
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter} from "@nextui-org/modal";

const SettingsButton: React.FC = () => {
    const {isOpen, onOpen, onOpenChange} = useState();

    return (
        <button className="h-[10%] w-[5%] rounded-full bg-transparent border-2 border-black
         text-black absolute top-[5%] left-[2.5%] flex items-center justify-center" >
        <Image
            src={settingsimg}
            alt="Settings"
            className='w-[90%] h-[90%] text-black'
        />
        </button>
    );
};

export default SettingsButton;