import React, {useEffect,  useState } from 'react';


function PublicProfile(props) {
    const selectedImage = props.img;


    return (
        <div>
            <div className="container mt-3">
                <h2 className="fw-semibold">Public Detail</h2>
                <p>This is people can see you profile. </p>
                <hr class="bg-danger border-4 border-top border-primary"></hr>
                <div className="d-flex justify-content-center">
                    <img
                        src={selectedImage}
                        className="rounded-top  profileimg"
                        style={{ aspectRatio: '2/2' }}
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}

export default PublicProfile