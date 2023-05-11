import profile from "../../assets/images/dummy-profile.png"
import React, {useEffect,  useState } from 'react';
import axios from "axios";

function PublicProfile() {
    const user = JSON.parse(localStorage.getItem('user')).data;
    useEffect(() => {
      axios
        .get(`${process.env.REACT_APP_API}/user/${user.user.email}`)
        .then((response) => {
            setDname(response.data.displayname)
        })
        .catch((err) => {
        });
    }, []);
    const [dname, setDname] = useState(user.user.displayname)
    const [selectedImage, setSelectedImage] = useState(profile);

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