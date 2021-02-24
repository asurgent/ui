import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import * as Permission from './index';

export default {
  title: 'UI Components|Permission',
  decorators: [withKnobs],
};

const Content = () => {
  const permissions = Permission.usePermission();
  const isGlobalAdmin = permissions.isGlobalAdmin();
  const hasFeature = permissions.withFeatures('@feature.ticket');
  const hasRole = permissions.withRoles('some-read-role');

  action('isAdmin: ', isGlobalAdmin);
  action('hasFeature: ', hasFeature);
  action('hasRole: ', hasRole);

  return (
    <>

      <Permission.Render withFeature={['@feature.ticket']}>
        {() => <h2>Tickets</h2>}
      </Permission.Render>

      <Permission.Render withFeature={['@feature.ticket.comment.create']}>
        {() => <div><button type="button">Create Comment</button></div>}
      </Permission.Render>

      <Permission.Render withFeature={['@feature.ticket.comment.delete']}>
        {() => <div><button type="button">Remove Comment</button></div>}
      </Permission.Render>

      <Permission.Render withFeature={['@feature.ticket.delete']}>
        {() => <div><button style={{ background: 'red' }} type="button">Delete Ticket</button></div>}
      </Permission.Render>

      <Permission.Render withRoles={['superAdmin']} fallback={<p>Hello regular user</p>}>
        {() => (
          <div>
            <hr />
            <h4 style={{ color: 'red' }}>Danger zone</h4>
            <p>I will only render for super-admins</p>
            <hr />
          </div>
        )}
      </Permission.Render>
    </>
  );
};

export const withPermissions = () => {
  const isSuperAdmin = boolean('@role.SuperAdmin', true);

  const permissionsFromUserContext = {
    // If only have this role you will just be able to view tickets
    'some-read-role': ['@feature.ticket'],
    'some-write-role': [
      boolean('@feature.ticket', true) && '@feature.ticket',
      boolean('@feature.ticket.comment.create', false) && '@feature.ticket.comment.create',
      boolean('@feature.ticket.delete', false) && '@feature.ticket.delete',
      boolean('@feature.ticket.comment.delete', false) && '@feature.ticket.comment.delete',
    ],
  };

  if (isSuperAdmin) {
    Object.assign(permissionsFromUserContext, {
      globalAdminKey: 'super-admin-role',
      'super-admin-role': [
        '@feature.ticket',
        '@feature.ticket.comment.create',
        '@feature.ticket.delete',
        '@feature.ticket.comment.delete',
      ],
    });
  }

  return (
    <Permission.Context value={permissionsFromUserContext}>
      <Content />
    </Permission.Context>
  );
};
