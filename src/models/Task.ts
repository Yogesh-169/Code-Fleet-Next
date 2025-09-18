import mongoose, { Document, Schema } from 'mongoose';

export interface ICoverageWindow {
  startTime: Date;
  endTime: Date;
  timezone: string;
  isActive: boolean;
}

export interface ITask extends Document {
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  skills: string[];
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  duration: {
    value: number;
    unit: 'hours' | 'days' | 'weeks' | 'months';
  };
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'published' | 'in_progress' | 'completed' | 'cancelled';
  company: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  assignedTo?: mongoose.Types.ObjectId;
  coverageWindows: ICoverageWindow[];
  requirements: {
    experience: 'entry' | 'intermediate' | 'senior' | 'expert';
    availability: string;
    location?: {
      type: 'remote' | 'onsite' | 'hybrid';
      country?: string;
      city?: string;
    };
  };
  attachments?: string[];
  tags: string[];
  isActive: boolean;
  publishedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CoverageWindowSchema = new Schema<ICoverageWindow>({
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  timezone: {
    type: String,
    required: true,
    default: 'UTC'
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

const TaskSchema = new Schema<ITask>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 5000
  },
  category: {
    type: String,
    required: true,
    maxlength: 100
  },
  subcategory: {
    type: String,
    maxlength: 100
  },
  skills: [{
    type: String,
    maxlength: 50
  }],
  budget: {
    min: {
      type: Number,
      required: true,
      min: 0
    },
    max: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      required: true,
      default: 'EUR',
      enum: ['EUR', 'USD', 'GBP']
    }
  },
  duration: {
    value: {
      type: Number,
      required: true,
      min: 1
    },
    unit: {
      type: String,
      required: true,
      enum: ['hours', 'days', 'weeks', 'months']
    }
  },
  priority: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    required: true,
    enum: ['draft', 'published', 'in_progress', 'completed', 'cancelled'],
    default: 'draft'
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  coverageWindows: [CoverageWindowSchema],
  requirements: {
    experience: {
      type: String,
      required: true,
      enum: ['entry', 'intermediate', 'senior', 'expert']
    },
    availability: {
      type: String,
      required: true,
      maxlength: 200
    },
    location: {
      type: {
        type: String,
        enum: ['remote', 'onsite', 'hybrid']
      },
      country: {
        type: String,
        maxlength: 100
      },
      city: {
        type: String,
        maxlength: 100
      }
    }
  },
  attachments: [{
    type: String
  }],
  tags: [{
    type: String,
    maxlength: 30
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  publishedAt: {
    type: Date
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Indexes
TaskSchema.index({ title: 'text', description: 'text' });
TaskSchema.index({ category: 1, subcategory: 1 });
TaskSchema.index({ company: 1 });
TaskSchema.index({ createdBy: 1 });
TaskSchema.index({ assignedTo: 1 });
TaskSchema.index({ status: 1 });
TaskSchema.index({ priority: 1 });
TaskSchema.index({ 'budget.min': 1, 'budget.max': 1 });
TaskSchema.index({ skills: 1 });
TaskSchema.index({ tags: 1 });
TaskSchema.index({ isActive: 1 });

export const Task = mongoose.model<ITask>('Task', TaskSchema);
