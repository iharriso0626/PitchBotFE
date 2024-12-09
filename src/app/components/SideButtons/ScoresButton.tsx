import React, { useState } from 'react';
import scoresimg from '../../images/scores.svg';
import Image from 'next/image';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import ScoresPage from '../../../pages/ScoresPage';

const RubricButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
             <button
                className="h-[10%] w-[5%] rounded-full bg-transparent border-2 border-black text-black absolute top-[35%] left-[2.5%] flex items-center justify-center"
                onClick={handleOpen}
            >
                <Image
                    src={scoresimg}
                    alt="Settings"
                    className='w-[90%] h-[90%] text-black'
                />
            </button>

            <Modal isOpen={isOpen} onOpenChange={setIsOpen} className='fixed inset-0 flex items-center justify-center'>
                <ModalContent className='w-[90%] h-[90%] bg-[#C1C6C8] rounded-lg shadow-lg relative'>
                    <ModalHeader>
                        <button
                            onClick={handleClose}
                            className="absolute appearance-none select-none top-1 right-1 rtl:left-1 rtl:right-[unset] p-2 text-foreground-500 rounded-full hover:bg-default-100 active:bg-default-200 tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2"
                        > 
                        </button>
                    </ModalHeader>
                    <ModalBody className='flex'>
                        <ScoresPage />
                    </ModalBody>
                    <ModalFooter className='flex justify-end'>
                        <button onClick={handleClose} className="p-2 rounded bg-blue-500 text-white absolute bottom-4 right-4">
                            Close
                        </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default RubricButton;