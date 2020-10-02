import React from 'react';
import PropTypes from 'prop-types';
import {
  usePersoniumAuthentication,
  usePersoniumProfile,
} from './lib/Personium';
import { PersoniumCellUrl } from 'personium-sdk-ts';

const ProfileImg: React.FC<{ src: string }> = ({ src }) => {
  return <img src={src} />;
};

ProfileImg.propTypes = {
  src: PropTypes.string.isRequired,
};

type ProfileCardProps = {
  cellUrl: PersoniumCellUrl;
};
export const ProfileCard: React.FC<ProfileCardProps> = ({ cellUrl }) => {
  const { auth } = usePersoniumAuthentication();
  const { profile, loading, error } = usePersoniumProfile(cellUrl);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error !== null) {
    return (
      <div>
        <h3>Error happenned</h3>
        <div>{JSON.stringify(error)}</div>
      </div>
    );
  }

  if (profile === null) {
    return (
      <div>
        <h3>Profile not found</h3>
        <div></div>
      </div>
    );
  }

  console.log(profile);

  return (
    <div className="card" style={{ padding: 8 }}>
      <h3>{profile.DisplayName}</h3>
      <blockquote>{profile.Description}</blockquote>
      <ProfileImg src={profile.Image} />
    </div>
  );
};

ProfileCard.propTypes = {
  cellUrl: PropTypes.instanceOf(PersoniumCellUrl).isRequired,
};
