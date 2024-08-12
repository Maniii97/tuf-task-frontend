interface EditQuestionProps {
    id: string;
    question: string;
    answer: string;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
}

export default EditQuestionProps;