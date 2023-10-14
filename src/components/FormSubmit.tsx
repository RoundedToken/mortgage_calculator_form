const FormSubmit = ({ isValid, dirty }: { isValid: boolean; dirty: boolean }) => {
    return (
        <div className="w-full border-t border-base_stroke py-8 mt-auto flex justify-center mobile:bg-base_secondary mobile:py-6 mobile:px-5">
            <div className="w-[1130px] flex justify-end tablet:w-full tablet:pr-[55px] mobile:p-0">
                <button
                    className={`${
                        isValid && dirty ? 'bg-my_yellow' : 'bg-slate-500'
                    } px-4 py-3 text-my_black rounded-lg font-medium w-[249px] h-[56px] mobile:w-[350px] mobile:mx-auto`}
                    type="submit"
                >
                    Продолжить
                </button>
            </div>
        </div>
    );
};

export default FormSubmit;
