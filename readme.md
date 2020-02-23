# Full Stack (Api: Express - mongoDb | Client: React )Sharing places (beach, hotel, restaurant...)

### TODO

- #### Setup Server
  - [x] Install Dependencies
  - [x] Install / Setup Linter
  - [x] Setup Express App
  - [x] Setup Not Found and Error Middlewares
- [x] Model DB

  - #### What data will we store?
    - place
      - name :string
      - description :string
      - rating :number
      - longitude :number
      - latitude :number
      - createdAt: Date
      - updatedAt: Date
    - ...

- [x] Setup Mongoose Model(s)
- [x] Setup MongoDb with Docker

  - mongoose can connect with a auth connection !
    - [ ] check why !

- #### Place route and logic

  - [x] GET
  - [x] GET/:id
  - [x] POST _! for image user can select a jpg need to use 'multer' and form-data_
  - [x] PUT
  - [x] PATCH
  - [x] DELETE/:id _Delete the associate image on folder (public/upload)_

  ***

- [x] Setup Client
- [ ] Create Form to add a new entry
- [ ] Setup Map SDK on client
- [ ] List all log entries on map
- [ ] DEPLOY!
