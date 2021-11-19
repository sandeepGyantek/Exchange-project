import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

const UserProfileIcon = () => {

    const profile = useSelector((state) => state.profile.profile);
    return (
        <Fragment>
            <div className="figure mb-3 userprofile_icon">
                {
                    profile ? <img src={`http:${profile.avatar}`} alt="avatar" /> :
                        <img src={'img/avatar.svg'} alt="avatar" />
                }
            </div>
        </Fragment>
    )
}

export default UserProfileIcon;
