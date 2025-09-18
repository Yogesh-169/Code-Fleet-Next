import mongoose, { Document, Schema } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  description?: string;
  website?: string;
  industry?: string;
  size?: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  location?: {
    country: string;
    city?: string;
    address?: string;
  };
  contactInfo: {
    email: string;
    phone?: string;
  };
  adminUsers: mongoose.Types.ObjectId[];
  hiringManagers: mongoose.Types.ObjectId[];
  financeUsers: mongoose.Types.ObjectId[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema = new Schema<ICompany>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    maxlength: 1000
  },
  website: {
    type: String,
    validate: {
      validator: function(v: string) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: 'Website must be a valid URL'
    }
  },
  industry: {
    type: String,
    maxlength: 100
  },
  size: {
    type: String,
    enum: ['startup', 'small', 'medium', 'large', 'enterprise']
  },
  location: {
    country: {
      type: String,
      required: true,
      maxlength: 100
    },
    city: {
      type: String,
      maxlength: 100
    },
    address: {
      type: String,
      maxlength: 500
    }
  },
  contactInfo: {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function(v: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
        message: 'Invalid email format'
      }
    },
    phone: {
      type: String,
      maxlength: 20
    }
  },
  adminUsers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  hiringManagers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  financeUsers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
CompanySchema.index({ name: 1 });
CompanySchema.index({ 'contactInfo.email': 1 });
CompanySchema.index({ 'location.country': 1 });
CompanySchema.index({ isActive: 1 });

export const Company = mongoose.model<ICompany>('Company', CompanySchema);
