import React from 'react';

function Awards() {
    return (
        <div className='container mt-5'>
            <div className='row '>
                <div className='col-12 col-md-6 text-center text-md-start'>
                    <img src="images/largestBroker.svg" alt="awards" className='mb-5 img-fluid' />
                </div>
                <div className='col-12 col-md-6 mt-3'>
                    <h1 className='mt-5'> Largest Stock Broker in India </h1>
                    <p>2+ million Zerotha clients contribute to over 15% of all retail order volumes in india daily by trading and investing in:</p>
                   <div className='row'>
                    <div className='col-12 col-sm-6'>
                         <ul>
                        <li>
                            <p>Futures & Options</p></li>

                        <li><p>Commodity derivatives </p>
                        </li>
                        <li><p>
                            Currency derivatives
                        </p></li>
                    </ul>

                    </div>
                    <div className='col-12 col-sm-6'>
                         <ul>
                        <li>
                            <p>Stocks & IPOs</p></li>

                        <li><p>Direct mutual funds </p>
                        </li>
                        <li><p>
                          Bonds & Gov. securities
                        </p></li>
                    </ul>

                    </div>
                   </div>

                <img src='images\pressLogos.png' alt="press logos" className='img-fluid mt-3' style={{width:"80%"}} />
                </div>
            </div>


        </div>
    );
}

export default Awards;