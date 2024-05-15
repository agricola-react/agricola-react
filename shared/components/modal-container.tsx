/* eslint-disable no-unused-vars */
import { CSSProperties, ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  children: ReactNode;
  width?: number;
  style?: CSSProperties;
};

export const ModalContainer = ({ open, setOpen, children, width, style }: Props) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay">
          <Dialog.Content
            className="DialogContent"
            style={{
              width,
              ...style,
            }}
          >
            <div
              onClick={() => {
                setOpen(false);
              }}
              className="flex justify-end mb-[10px] cursor-pointer"
            >
              <Cross1Icon width={20} height={20} />
            </div>
            {children}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
