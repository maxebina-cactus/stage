import { sub } from 'date-fns'

const notifications = [{
  id: 1,
  unread: true,
  sender: { name: 'Jordan Brown', email: 'jordan.brown@example.com', avatar: { src: 'https://i.pravatar.cc/128?u=2' } },
  body: 'sent you a message',
  date: sub(new Date(), { minutes: 7 }).toISOString()
}, {
  id: 2,
  sender: { name: 'Lindsay Walton' },
  body: 'subscribed to your email list',
  date: sub(new Date(), { hours: 1 }).toISOString()
}, {
  id: 3,
  unread: true,
  sender: { name: 'Taylor Green', email: 'taylor.green@example.com', avatar: { src: 'https://i.pravatar.cc/128?u=3' } },
  body: 'sent you a message',
  date: sub(new Date(), { hours: 3 }).toISOString()
}, {
  id: 4,
  sender: { name: 'Courtney Henry', avatar: { src: 'https://i.pravatar.cc/128?u=4' } },
  body: 'added you to a project',
  date: sub(new Date(), { hours: 3 }).toISOString()
}, {
  id: 5,
  sender: { name: 'Tom Cook', avatar: { src: 'https://i.pravatar.cc/128?u=5' } },
  body: 'abandonned cart',
  date: sub(new Date(), { hours: 7 }).toISOString()
}, {
  id: 6,
  sender: { name: 'Casey Thomas', avatar: { src: 'https://i.pravatar.cc/128?u=6' } },
  body: 'purchased your product',
  date: sub(new Date(), { days: 1, hours: 3 }).toISOString()
}, {
  id: 7,
  unread: true,
  sender: { name: 'Kelly Wilson', email: 'kelly.wilson@example.com', avatar: { src: 'https://i.pravatar.cc/128?u=8' } },
  body: 'sent you a message',
  date: sub(new Date(), { days: 2 }).toISOString()
}, {
  id: 8,
  sender: { name: 'Jamie Johnson', email: 'jamie.johnson@example.com', avatar: { src: 'https://i.pravatar.cc/128?u=9' } },
  body: 'requested a refund',
  date: sub(new Date(), { days: 5, hours: 4 }).toISOString()
}, {
  id: 9,
  unread: true,
  sender: { name: 'Morgan Anderson', email: 'morgan.anderson@example.com' },
  body: 'sent you a message',
  date: sub(new Date(), { days: 6 }).toISOString()
}, {
  id: 10,
  sender: { name: 'Drew Moore' },
  body: 'subscribed to your email list',
  date: sub(new Date(), { days: 6 }).toISOString()
}, {
  id: 11,
  sender: { name: 'Riley Davis' },
  body: 'abandonned cart',
  date: sub(new Date(), { days: 7 }).toISOString()
}, {
  id: 12,
  sender: { name: 'Jordan Taylor' },
  body: 'subscribed to your email list',
  date: sub(new Date(), { days: 9 }).toISOString()
}, {
  id: 13,
  sender: { name: 'Kelly Wilson', avatar: { src: 'https://i.pravatar.cc/128?u=8' } },
  body: 'subscribed to your email list',
  date: sub(new Date(), { days: 10 }).toISOString()
}, {
  id: 14,
  sender: { name: 'Jamie Johnson', avatar: { src: 'https://i.pravatar.cc/128?u=9' } },
  body: 'subscribed to your email list',
  date: sub(new Date(), { days: 11 }).toISOString()
}, {
  id: 15,
  sender: { name: 'Morgan Anderson' },
  body: 'purchased your product',
  date: sub(new Date(), { days: 12 }).toISOString()
}, {
  id: 16,
  sender: { name: 'Drew Moore', avatar: { src: 'https://i.pravatar.cc/128?u=16' } },
  body: 'subscribed to your email list',
  date: sub(new Date(), { days: 13 }).toISOString()
}]

export default eventHandler(async () => {
  return notifications
})
