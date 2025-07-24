// import { required } from 'joi';
import mongoose from 'mongoose';

const PodcastCardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  mediaUrl:{
   type:String,
   required:true
  },
  creatorName: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  category: {
    type: String,    
    enum: ['Education', 'Culture', 'Business', 'Health', 'Comedy','News','Science','History','Religion','Development','Sports','Crime',"Most Popular"],     
    required: true        
  },
  mediaType: {
    type: String,
    enum: ['audio', 'video'],
    default: 'audio'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const PodcastCardModel = mongoose.model('card', PodcastCardSchema);
export default PodcastCardModel;
