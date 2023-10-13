import { FC, useCallback, useRef, useState } from 'react';
import FieldWrapper from './FieldWrapper';
import { FieldHookConfig, useField } from 'formik';
import Portal from './Portal';
import caretDownImg from '../assets/CaretDown.svg';
import Dropdown from './Dropdown';
import SearchInput from './SearchInput';

interface ISelect {
    label: string;
    options: readonly string[];
    placeholder: string;
    isSearch?: boolean;
}

const Select: FC<ISelect & FieldHookConfig<string>> = ({ isSearch = false, placeholder, options, label, ...props }) => {
    const [field, meta, helpers] = useField(props);
    const { value } = field;
    const { setValue } = helpers;
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLDivElement>(null);
    const [searchValue, setSearchValue] = useState('');
    const filteredOptions = options.filter(option => option.toLowerCase().includes(searchValue.toLowerCase()));

    if (isSearch) filteredOptions.sort();

    const dropdownItemHandler = useCallback(
        (option: string) => {
            setValue(option);
            setIsOpen(false);
        },
        [setValue],
    );

    return (
        <FieldWrapper containerRef={containerRef} meta={meta} label={label} name={props.name}>
            <div
                className={`${
                    isOpen ? 'border-my_yellow' : 'border-base_stroke'
                } flex justify-between cursor-pointer border bg-base_inputs rounded-md text-primary px-6 py-3 text-base font-normal relative`}
                ref={selectRef}
                onClick={() => setIsOpen(prev => !prev)}
            >
                {value ? (
                    <p className="w-[240px] whitespace-nowrap overflow-hidden text-ellipsis">{value}</p>
                ) : (
                    <p className="w-[240px] whitespace-nowrap overflow-hidden text-ellipsis text-disable_text">
                        {placeholder}
                    </p>
                )}

                <img className={`${isOpen && 'rotate-180'}`} src={caretDownImg} alt="" width={24} height={24} />
            </div>

            <Portal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                container={document.body}
                activatorRef={selectRef}
                marginTop={8}
            >
                <Dropdown>
                    {isSearch && <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />}

                    {filteredOptions.map((option, i) => (
                        <Dropdown.Item
                            key={i}
                            value={option}
                            currentValue={value}
                            onClick={() => dropdownItemHandler(option)}
                        />
                    ))}
                </Dropdown>
            </Portal>
        </FieldWrapper>
    );
};

export default Select;
