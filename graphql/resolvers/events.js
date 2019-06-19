const Event = require('../../models/event')
const User = require('../../models/user')
const {dateToString} = require('../../helpers/date')
const {user,events,singleEvent} = require('./merge')

const transformEvent = (event) =>{
    return {
            ...event._doc,
            _id:event.id,
            date:dateToString.bind(this,event._doc.date),
            creator:user.bind(this,event._doc.creator)
            }
}

module.exports = {
      events: () => {
        return Event.find()
          .then(events => {
            return events.map(event => {
              return transformEvent(event)
            });
          })
          .catch(err => {
            throw err;
          });
      },
      createEvent: (args,req) => {
        
        if(!req.isAuth){throw new Error('Unauthenticated')} 
          
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: dateToString(args.eventInput.date),
          creator: req.userId
        });
        let createdEvent;
        return event
          .save()
          .then(result => {
            createdEvent = transformEvent(event)
            return User.findById(req.userId);
          })
          .then(user => {
            if (!user) {
              throw new Error('User not found.');
            }
            user.createdEvents.push(event);
            return user.save();
          })
          .then(result => {
            return createdEvent;
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      }
    }