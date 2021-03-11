import React from 'react';
import * as Permission from './index';

const Content = () => {
  const permissions = Permission.usePermission();
  const isGlobalAdmin = permissions.isGlobalAdmin();
  const hasFeature = permissions.withFeatures('@feature.ticket');
  const hasRole = permissions.withRoles('some-read-role');

  console.log('isAdmin: ', isGlobalAdmin);
  console.log('hasFeature: ', hasFeature);
  console.log('hasRole: ', hasRole);

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

const Story = {
  title: 'Helpers/Permissions',
  component: Permission,
  argTypes: {
    'some-read-role': { 
      control: {
        type: 'check',
        options: [
          '@feature.ticket',
          '@feature.ticket.comment.create',
          '@feature.ticket.delete',
          '@feature.ticket.comment.delete',
        ],
      },
    },
  }
};
export default Story;


const Template = (args) =>  {
  const isSuperAdmin = args['@role.SuperAdmin'];

  const permissionsFromUserContext = {
    // If only have this role you will just be able to view tickets
    'some-read-role': ['@feature.ticket'],
    'some-read-role': args['some-read-role']
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

export const Permissions = Template.bind({});
Permissions.args = {
  'some-read-role': ['@feature.ticket'],
  '@role.SuperAdmin': true,
}