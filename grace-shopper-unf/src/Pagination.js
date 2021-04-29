import React from 'react'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

const Pagination = ({ productsPerPage, totalNumberOfProducts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalNumberOfProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }
    console.log(pageNumbers);

    return (
        <nav>
            <ul style={{ width: '200px', display: 'flex', flexDirection: 'row', marginLeft: '650px' }}>
                {pageNumbers.map(number => (
                    <div>
                        <button style={{ padding: '0px 10px', margin: '0px 10px', fontFamily: 'Rubik', fontSize: '20px', border: '2px solid black', backgroundColor: 'white' }} onClick={() => paginate(number)}> < ArrowRightAltIcon style={{ height: '20px', marginTop: '2px' }} /> {number} </button>
                    </div>
                )
                )}
            </ul>
        </nav>
    )
}

export default Pagination