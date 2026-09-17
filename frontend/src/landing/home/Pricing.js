import React from 'react';

function Pricing() {
    return (
        <div className='container'>
            <div className='row'>
                <div className="col-12 col-md-4 mb-4 mb-md-0">
                    <h1 className='mb-3'>Unbeatable Pricing</h1>
                    <p>We pioneered the concept of discount broking and price transparency in india.Flat fees and no hidden charges </p>
                    <a href='/pricing' style={{ textDecoration: "none" }}>See pricing<i className="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                </div>
                <div className="d-none d-md-block col-md-2"></div>
                <div className="col-12 col-md-6">
                    <div className="row text-center">
                        <div className="col-12 col-sm-6 p-3 border mb-3 mb-sm-0">
                            <h1 className='mb-3'><i className="fa fa-inr" aria-hidden="true"></i>0</h1>
                            <p>Free equity delivery and direct<br /> mutual fund investments</p>
                        </div>
                        <div className="col-12 col-sm-6 p-3 border">
                            <h1><i className="fa fa-inr" aria-hidden="true"></i>20</h1>
                            <p>Intraday and F&O</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pricing;