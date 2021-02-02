import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Permission, { Context } from './index';

export default {
  title: 'UI Components|Permission',
  decorators: [withKnobs],
};

export const withPermissions = () => {
  // User context
  const permissions = {
    reader: { ticket: ['canViewComment'] },
    guest: { ticket: ['canViewComment'], myEnv: ['canRemoveAlertRule'] },
    superAdmin: { ticket: ['canDeleteComment'] },
  };

  return (
    <Context value={permissions}>
      {/* <Permission>
        {() => <p>Im only viable for all</p>}
      </Permission> */}

      {/* My env page */}
      {/* <Permission roles={['reader', 'guest']}>
        {() => (
          <>
            <Permission whiteList={{ ticket: ['canViewTickets'] }}>
              {() => <p>all the tickets</p>}
            </Permission>
          </>
        )}
      </Permission> */}

      {/* Ticket page */}
      <Permission withRoles={['guest']}>
        {() => (
          <>
            <Permission withFeature={{ ticket: ['canViewComment'] }}>
              {() => <p>Comment here</p>}
            </Permission>

            <Permission
              withFeature={{ ticket: ['canDeleteComment'] }}
              fallback={<p style={{ color: 'red' }}>You dont have permission to view this</p>}
            >
              {() => <p>Delete comment</p>}
            </Permission>

            <Permission withFeature={{ myEnv: ['canRemoveAlertRule'] }}>
              {() => <p>Remove alert rule</p>}
            </Permission>
          </>
        )}
      </Permission>

      {/* <Permission whiteList={{ permissionKey1: [] }}>
        {() => <p>Im only viable for users with permissionKey1</p>}
      </Permission>

      <Permission whiteList={{ permissionKey2: [] }}>
        {() => <p>Im only viable for users with permissionKey2</p>}
      </Permission>

      <Permission whiteList={{ permissionKey2: ['feature-2'] }}>
        {() => <p>Im only viable for users with permissionKey2 and feature-2</p>}
      </Permission>

      <Permission whiteList={{ permissionKey2: ['feature-3'] }}>
        {() => <p>Im only viable for users with permissionKey2 and feature-3</p>}
      </Permission>

      <Permission
        whiteList={{ permissionKey3: [] }}
        fallback={<p style={{ color: 'red' }}>You dont have permission to view this</p>}
      >
        {() => <p>Im only viable for users with permissionKey3</p>}
      </Permission>

      <Permission superAdminOnly>
        {() => <p>Im only viable for super admins</p>}
      </Permission> */}
    </Context>
  );
};
