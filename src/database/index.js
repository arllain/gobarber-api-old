import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.postgres();
    this.mongo();
  }

  postgres() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongo.connection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      usefindAndModify: true,
    });
  }
}

export default new Database();
