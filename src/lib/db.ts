import mongoose from 'mongoose';

declare global {
  // eslint-disable-next-line no-var
  var mongooseConn: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not set');
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (!global.mongooseConn) {
    global.mongooseConn = { conn: null, promise: null };
  }
  if (global.mongooseConn.conn) return global.mongooseConn.conn;
  if (!global.mongooseConn.promise) {
    global.mongooseConn.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'codfleet',
      autoIndex: true,
    });
  }
  global.mongooseConn.conn = await global.mongooseConn.promise;
  return global.mongooseConn.conn;
}

// Alias for consistency with existing codebase
export function connectDB(): Promise<typeof mongoose> {
  return connectToDatabase();
}

// Health check for database connection
export async function checkDatabaseHealth(): Promise<{ 
  status: 'healthy' | 'unhealthy'; 
  message: string; 
  responseTime?: number 
}> {
  const startTime = Date.now();
  
  try {
    const conn = await connectToDatabase();
    await conn.connection.db.admin().ping();
    
    const responseTime = Date.now() - startTime;
    
    return {
      status: 'healthy',
      message: 'Database connection is healthy',
      responseTime
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      message: `Database connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

// Graceful shutdown
export async function closeDatabaseConnection(): Promise<void> {
  try {
    if (global.mongooseConn?.conn) {
      await global.mongooseConn.conn.connection.close();
      global.mongooseConn.conn = null;
      global.mongooseConn.promise = null;
    }
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
}


