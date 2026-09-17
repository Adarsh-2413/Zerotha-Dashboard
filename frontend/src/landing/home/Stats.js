import React from 'react';

function Stats() {
    return (
        <div className='container mt-5 mb-5 p-3'>
            <div className='row p-5'>
                <div className='col-12 col-md-6 mt-5 p-5'>
                    <h1 className='fs-2'>Trust with confidence</h1>
                    &nbsp;
                    <h3 className='fs-4'>Customer-first always</h3>
                    <p className='text-muted'>That's why 1.3cr+ customers trust Zerotha with 3.5+ lakh crores worth of equity investments.</p>
                    <h3 className='fs-4'>No spam or gimmicks</h3>
                    <p className='text-muted'>
                        We believe in transparency and delivering real value to our customers. That's why we never send unsolicited emails or use misleading tactics.
                    </p>
                    <h3 className='fs-4'>The Zerotha universe</h3>
                    <p className='text-muted'>Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.</p>
                    <h3 className='fs-4'>Do better with money</h3>
                    <p className='text-muted'>We are building a smarter investing experience for modern traders. We believe in transparency and delivering real value to our customers. That's why we never send unsolicited emails or use misleading tactics.</p>
                </div>
                <div className='col-12 col-md-6 mt-5 p-md-5'>
                    <img src="images/ecosystem.png" alt="Zerodha ecosystem" className='img-fluid' style={{ width: "90%" }} />
                    <div className='text-center mt-3'>
                        <a href='/product' className='mx-3 mx-md-5 d-block d-md-inline mb-2 mb-md-0' style={{ textDecoration: "none" }}>Explore our product<i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                        <a href='/signup' className='d-block d-md-inline' style={{ textDecoration: "none" }}>Try kite demo<i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats;