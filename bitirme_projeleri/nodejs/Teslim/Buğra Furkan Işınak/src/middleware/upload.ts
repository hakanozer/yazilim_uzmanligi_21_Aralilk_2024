import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Create avatars subdirectory
const avatarsDir = path.join(uploadsDir, 'avatars');
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

// Remove the users subdirectory if it exists (it's created by mistake)
const usersDir = path.join(avatarsDir, 'users');
if (fs.existsSync(usersDir)) {
  fs.rmSync(usersDir, { recursive: true, force: true });
  console.log('Removed incorrect users directory');
}

console.log('Upload directories created:', { uploadsDir, avatarsDir });
console.log('Avatars directory exists:', fs.existsSync(avatarsDir));
console.log('Avatars directory contents:', fs.readdirSync(avatarsDir));

// Create articles subdirectory
const articlesDir = path.join(uploadsDir, 'articles');
if (!fs.existsSync(articlesDir)) {
  fs.mkdirSync(articlesDir, { recursive: true });
}

// Configure multer for profile pictures
const profilePictureStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Upload destination:', avatarsDir);
    console.log('Directory exists:', fs.existsSync(avatarsDir));
    cb(null, avatarsDir);
  },
  filename: (req, file, cb) => {
    const userId = req.user?._id || 'unknown';
    const fileExtension = path.extname(file.originalname);
    const fileName = `user_${userId}${fileExtension}`;
    console.log('Upload filename:', fileName);
    console.log('Full path will be:', path.join(avatarsDir, fileName));
    cb(null, fileName);
  }
});

// Configure multer for article images
const articleImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, articlesDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const fileExtension = path.extname(file.originalname);
    const fileName = `article_${timestamp}${fileExtension}`;
    cb(null, fileName);
  }
});

// File filter for images
const imageFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Profile picture upload middleware
export const uploadProfilePicture = multer({
  storage: profilePictureStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
}).single('profilePicture');

// Article image upload middleware
export const uploadArticleImage = multer({
  storage: articleImageStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
}).single('articleImage');

// Helper function to delete old profile picture
export const deleteOldProfilePicture = (userId: string) => {
  const avatarsDir = path.join(__dirname, '../../public/uploads/avatars');
  const files = fs.readdirSync(avatarsDir);
  
  files.forEach(file => {
    if (file.startsWith(`user_${userId}`)) {
      const filePath = path.join(avatarsDir, file);
      try {
        fs.unlinkSync(filePath);
        console.log(`Deleted old profile picture: ${file}`);
      } catch (error) {
        console.error(`Error deleting old profile picture: ${error}`);
      }
    }
  });
};

// Helper function to get profile picture URL
export const getProfilePictureUrl = (userId: string): string | null => {
  const avatarsDir = path.join(__dirname, '../../public/uploads/avatars');
  const files = fs.readdirSync(avatarsDir);
  
  const profilePicture = files.find(file => file.startsWith(`user_${userId}`));
  return profilePicture ? `/uploads/avatars/${profilePicture}` : null;
};
