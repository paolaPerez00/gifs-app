interface Props {
    searches: string[];
}


const PreviousSearches = ({ searches }: Props) => {
    return (
        <div className='previous-searches'>
            <h2>Búsquedas previas</h2>
            <ul className='previous-searches-list'>
                {
                    searches.map((term) => (
                        <li key={term} > {term}</li>
                    ))
                }
            </ul>
        </div >
    )
}

export default PreviousSearches
