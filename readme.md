Full Stack Sharing places \
(Api: Express - mongoDb | Client: React ) \
(beach, hotel, restaurant...)

---

### TODO

#### Setup Server

- [x] Install Dependencies
- [x] Install / Setup Linter
- [x] Setup Express App
- [x] Setup Not Found and Error Middlewares
- [x] Setup MongoDb with Docker
  - mongoose can connect with a auth connection :shit: !
  - check why [ ] :no_mouth: !

#### What data will we store?

    - Place
      - name : string
      - description : string
      - rating : number
      - longitude : number
      - latitude : number
      - user : ObjectId (user._id)
      - comments : [ObjectId (comment._id)]
      - createdAt : Date
      - updatedAt : Date

    - User
      - name : string
      - email : string
      - password : string
      - place : [ObjectId (place._id)]

    - Comment
      - contente : string
      - place : ObjectID (place._id)
      - user : ObjectId (user._id)

#### Setup Mongoose Model(s)

- [x] Place
- [x] User
- [x] comment

#### Setup Joi Validation

- [x] Register user
- [x] login user
- [x] place creation

#### Place route and logic

---

##### place

- [x] GET /place
- [x] GET /place/:id
- [x] POST /create
  - _( use the token to retrive userId )_
  - _( ! for image user can select a jpg need to use 'multer' and form-data )_
- [ ] PUT /place/:id
  - _( all fields needed to update place)_
- [ ] PATCH /place/:id
  - _( only one field is needed )_
- [ ] DELETE /place/:id
  - _( Delete the associate image on folder (public/upload) and delete comments associate )_

---

##### user

- [x] GET /user
- [x] GET /user/:id
- [x] POST /user
- [ ] PUT /user/:id _( all fields needed )_
- [ ] PATCH /user/:id _( one fields needed )_
- [ ] DELETE /user/:id
  - _( delete all place, comments and image associate to the user/place )_
  - [ ] POST /user/login
    - _( return token with id and name informations)_

---

#### comment

- [ ] GET /comment
- [ ] GET /comment/:id
- [ ] POST /comment
- [ ] PATCH /comment/:id
- [ ] DELETE /comment/:id

---

## Client

- [x] Setup Client
- [ ] Create Form to add a new entry
- [ ] Setup Map SDK on client
- [ ] List all log entries on map
- [ ] DEPLOY!
