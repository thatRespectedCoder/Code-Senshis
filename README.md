# Code-Senshis

All the routes available 

    Event Routes:
        POST /events/create - Create an event
        POST /events/:id/register - Register an attendee for an event
        PUT /events/:id/confirm - Confirm attendance for an event
        PUT /events/:id/cancel - Cancel attendance for an event
        PUT /events/:id - Update an event
        DELETE /events/:id - Delete an event
        POST /events/:id/comment - Add a comment to an event
        GET /events/recommended - Get recommended events for a user

    User Routes:
        GET /users/leaderboard - Get leaderboard of active users
        GET /users/:id - Get user profile
