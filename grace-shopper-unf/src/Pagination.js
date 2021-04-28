import React from 'react'

const Pagination = ({productsPerPage, totalNumberOfProducts, paginate}) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalNumberOfProducts / productsPerPage); i++){
        pageNumbers.push(i);
    }
    console.log(pageNumbers);

    return (
        <nav>
            <ul>
                {pageNumbers.map(number => (

                    <li key={number}>
                        <button onClick={() => paginate(number)} >
                        {number}
                        </button>
                    </li>
                )    
                    )}
            </ul>
        </nav>
    )
}

export default Pagination