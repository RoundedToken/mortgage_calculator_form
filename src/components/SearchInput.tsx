import searchImg from '../assets/MagnifyingGlass.svg';

const SearchInput = ({
    searchValue,
    setSearchValue,
}: {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
    return (
        <div className="px-3 py-2">
            <div className="flex gap-2 px-4 py-2 bg-base_inputs border-base_stroke border rounded-[5px]">
                <img src={searchImg} alt="search" width={20} height={20} />

                <input
                    className="bg-transparent placeholder:text-disable_text w-full"
                    placeholder="Поиск..."
                    type="text"
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SearchInput;
