interface Props {
    placeholder: string;
    textButton?: string;
}

const SearchBar = ({ placeholder, textButton = 'Buscar' }: Props) => {
    return (
        <div className='search-container'>
            <input type="text" placeholder={placeholder} />
            <button>{textButton}</button>
        </div>
    )
}

export default SearchBar
