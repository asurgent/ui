import { newMoment } from '../Moment/momentParsers';

const time08 = () => newMoment()
  .set({ hour: '08' })
  .startOf('hour');

const time17 = () => newMoment()
  .set({ hour: '17' })
  .startOf('hour');

const nextFullHour = () => newMoment()
  .add(1, 'hours')
  .startOf('hour');

const nextFullHour30Mins = () => newMoment()
  .add(1, 'hours')
  .startOf('hour')
  .add(30, 'minutes');

export const ongoingBusinessHours = {
  reason: 'Business hours service window (8-17)',
  entity_ids: [
    '7AF1F96B4306D4EFA5CAB923F4A25C21DAB87AFC',
  ],
  entity_names: [
    'co-agent-test01 (7AF1F96B4306D4EFA5CAB923F4A25C21DAB87AFC)',
  ],
  enabled: true,
  ticket_id_external: 'https://github.com/asurgent/admin/issues/224',
  modified: '2020-01-01T00:00:00.000Z',
  requested_by: 'fake@email.com',
  start: '2020-01-01T00:00:00.000Z',
  end: '2030-01-01T00:00:00.000Z',
  cron_expression: '0 8 * * *',
  duration_in_seconds: 32400,
  dyn_is_passed: false, // service window has passed
  dyn_next_execution: (newMoment() > time08() && newMoment() < time17())
    ? time08().add(1, 'days').toISOString()
    : time08().toISOString(),
  dyn_is_ongoing_now: newMoment() > time08() && newMoment() < time17(),
  dyn_is_ongoing_from: time08().toISOString(),
  dyn_is_ongoing_to: time17().toISOString(),
  temp_ticket_id: '20f482a0-1ecd-4238-8c5e-61418db282b0',
  id: 'B9180387D1F9D0F8ECCA592EDEEA58E2DA8DA0E6',
  customer_id: '3688',
  customer_name: 'Imagine DLX AB',
  customer_display_name: 'Imagine DLX AB (3688)',
};

export const upcomingNextFullHour = {
  reason: 'Upcoming next full hour (half hour duration)',
  entity_ids: [
    '7AF1F96B4306D4EFA5CAB923F4A25C21DAB87AFC',
  ],
  entity_names: [
    'co-agent-test01 (7AF1F96B4306D4EFA5CAB923F4A25C21DAB87AFC)',
  ],
  enabled: true,
  ticket_id_external: 'https://github.com/asurgent/admin/issues/224',
  modified: '2020-01-01T00:00:00.000Z',
  requested_by: 'fake@email.com',
  start: '2020-01-01T00:00:00.000Z',
  end: '2030-01-01T00:00:00.000Z',
  cron_expression: `0 ${newMoment().hours() + 1} * * *`,
  duration_in_seconds: 1800,
  dyn_is_passed: false,
  dyn_next_execution: nextFullHour().toISOString(),
  dyn_is_ongoing_now: false,
  dyn_is_ongoing_from: nextFullHour().toISOString(),
  dyn_is_ongoing_to: nextFullHour30Mins().toISOString(),
  temp_ticket_id: 'cfdd233e-0cac-4821-a213-f0e7874fe333',
  id: '8D6A8C78A7BEFA22ECC6AC5F43499BC3C89F156C',
  customer_id: '3688',
  customer_name: 'Imagine DLX AB',
  customer_display_name: 'Imagine DLX AB (3688)',
};

export const expired = {
  reason: 'Upcoming next full hour (half hour duration)',
  entity_ids: [
    '7AF1F96B4306D4EFA5CAB923F4A25C21DAB87AFC',
  ],
  entity_names: [
    'co-agent-test01 (7AF1F96B4306D4EFA5CAB923F4A25C21DAB87AFC)',
  ],
  enabled: true,
  ticket_id_external: 'https://github.com/asurgent/admin/issues/224',
  modified: '2020-01-01T00:00:00.000Z',
  requested_by: 'fake@email.com',
  start: '2020-01-01T00:00:00.000Z',
  end: '2020-06-01T00:00:00.000Z',
  cron_expression: `0 ${newMoment().hours() + 1} * * *`,
  duration_in_seconds: 1800,
  dyn_is_passed: true,
  dyn_next_execution: null,
  dyn_is_ongoing_now: false,
  dyn_is_ongoing_from: null,
  dyn_is_ongoing_to: null,
  temp_ticket_id: 'cfdd233e-0cac-4821-a213-f0e7874fe333',
  id: '8D6A8C78A7BEFA22ECC6AC5F43499BC3C89F156C',
  customer_id: '3688',
  customer_name: 'Imagine DLX AB',
  customer_display_name: 'Imagine DLX AB (3688)',
};
