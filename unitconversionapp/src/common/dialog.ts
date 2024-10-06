export type DialogState = {
    isOpen: boolean;
    header: string;
    message: string;
};

export const initialDialogState: DialogState = {
    isOpen: false,
    header: '',
    message: '',
};

export const onHideDialog = (setDialog: React.Dispatch<React.SetStateAction<DialogState>>) => {
    setDialog(initialDialogState);
};