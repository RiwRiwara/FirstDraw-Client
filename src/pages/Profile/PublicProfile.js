import React, { useEffect, useState } from 'react';


function PublicProfile(props) {
    const selectedImage = props.img;
    const displayname = props.displayname;
    const bio = props.bio;


    return (
        <div>
            <div className="container mt-3">
                <h2 className="fw-semibold">Public Detail</h2>
                <p>This is people can see you profile. </p>
                <hr class="bg-danger border-4 border-top border-primary"></hr>
                <div className='row mb-3'>
                    <div className="col-12 col-md-4 justify-content-center d-flex">
                        <img
                            src={selectedImage}
                            className="rounded-top  profileimg"
                            style={{ aspectRatio: '4/5' }}
                            alt=""
                        />
                    </div>
                    <div className="col-12 col-md-8">
                    <div className='d-flex justify-content-center'>
                        <h4 className='fw-bold m-2'>{displayname}</h4>
                    </div>
                        <div className='row'>
                            <textarea
                                className="form-control pe-none"
                                value={bio}
                                rows="4"
                            ></textarea>
                        </div>

                    </div>
                </div>
                <hr class="bg-danger border-4 border-top border-primary"></hr>
                <div>
                    <h5 className='fw-bold'>Collection - Cards</h5>
                </div>
                <hr class="bg-danger border-4 border-top border-primary"></hr>
                <div>
                    <h5 className='fw-bold'>Collection - Deck</h5>
                </div>
                <hr class="bg-danger border-4 border-top border-primary"></hr>
            </div>
        </div>
    )
}

export default PublicProfile