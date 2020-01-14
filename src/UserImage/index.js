import React from 'react';
import UserPhoto from './UserPhoto';

const Square = ({ square, ...props }) => <UserPhoto square {...props} />;

export { UserPhoto as Circle };
export { Square };
