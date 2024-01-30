import mongooseClient from 'mongoose';

export interface Clinic{
    ClinicName:String,
    Area:String,
    Waze:String,
    WaseSite:String,
    ClinicCode:String,
}

const clinicsSchema = new mongooseClient.Schema<Clinic>({
    ClinicName:String,
    Area:String,
    Waze:String,
    WaseSite:String,
    ClinicCode:String,
  });
  
  var clinicsModel = mongooseClient.model<Clinic>('Clinics', clinicsSchema);
  
  module.exports = clinicsModel;
  