<h2>Full Stack Sharing places (beach, hotel, restaurant...)</br>
- Api: Nodejs - Express - mongoDb</br>
- Client: React</br>
</h2>

### TODO

#### Setup Server

- [x] Install Dependencies
- [x] Install / Setup Linter
- [x] Setup Express App
- [x] Setup Not Found and Error Middlewares
- [x] Setup MongoDb with Docker
  - mongoose can't connect with a auth connection :shit: !
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
      - type de lieu : [ObjectId (typeLieu._id)] ?
        - (hotel, resto, plage...)
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

    - Typelieu ?
      - name : string

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

- [x] GET ("/")
- [x] GET ("/:id")
- [x] POST ("/create")
  - _( use the token to retrive userId )_
  - _( ! for image user can select a jpg need to use 'multer' and form-data )_
- [ ] ~~PUT (":/id")~~
  - ~~_( all fields needed to update place)_~~
- [x] PATCH (":/id")
  - _( only one field is needed )_
    - [ ] -search how to validate patch (for now dont throw error when field aren't in model)
- [x] DELETE (":/id")
  - _( Delete the associate image on folder (public/upload) and delete comments associate )_
- [x] DELETE ("/:placeId/:cmtId") _(delete comment)_

---

##### user

- [x] GET ("/")
- [x] GET ("/:id")
- [x] POST ("/")
- [ ] ~~PUT ("/:id") _( all fields needed )_~~
- [ ] PATCH ("/:id") _( one fields needed )_
- [x] DELETE ("/:id")
  - _( delete all place, comments and image associate to the user/place )_
- [x] POST /login
  - _( return token with id and name informations)_

---

#### comment

- [x] GET ("/")
- [x] GET ("/:id")
- [x] POST ("/")
- [x] PATCH ("/:id")
  - [ ] -search how to validate patch (for now dont throw error when field aren't in model)
- [x] DELETE ("/:id")

---

## Client

- [x] Setup Client
- [ ] Create Form to add a new entry
- [ ] Setup Map SDK on client
- [ ] List all log entries on map
- [ ] DEPLOY!
