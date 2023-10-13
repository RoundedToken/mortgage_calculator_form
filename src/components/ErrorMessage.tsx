import warningOctagonImg from '../assets/WarningOctagon.svg';

const ErrorMessage = ({ text }: { text: string }) => {
    return (
        <div className="bg-error px-3 py-1.5 flex gap-1 items-start rounded">
            <img src={warningOctagonImg} alt="Warning" width={16} height={16} />

            <span className="text-primary text-sm font-normal">{text}</span>
        </div>
    );
};

export default ErrorMessage;
