import { Document, Model } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      context: {
        BookmarkData: Model<Document>;
        CategoryData: Model<Document>;
      };
    }
  }
}
