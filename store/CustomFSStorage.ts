import * as FileSystem from 'expo-file-system';

const storagePath = `${FileSystem.documentDirectory}persistedData/`;

const ensureDirectoryExists = async () => {
  try {
    const dirInfo = await FileSystem.getInfoAsync(storagePath);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(storagePath, { intermediates: true });
    }
  } catch (error) {
    console.error('Error ensuring directory exists:', error);
  }
};

const CustomFileSystemStorage = {
  async setItem(key, value) {
    try {
      await ensureDirectoryExists();
      const sanitizedKey = key.replace(/:/g, '_'); // Sanitize key to avoid invalid characters
      const fileUri = `${storagePath}${sanitizedKey}`;
      const valueString =
        typeof value === 'string' ? value : JSON.stringify(value);
      await FileSystem.writeAsStringAsync(fileUri, valueString, {
        encoding: FileSystem.EncodingType.UTF8,
      });
    } catch (error) {
      console.error('Error saving to FileSystem:', error);
    }
  },

  async getItem(key) {
    try {
      const sanitizedKey = key.replace(/:/g, '_');
      const fileUri = `${storagePath}${sanitizedKey}`;

      await ensureDirectoryExists();

      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        return null;
      }

      const content = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      return content;
    } catch (error) {
      console.error('Error reading from FileSystem:', error);
      return null;
    }
  },

  async removeItem(key) {
    try {
      const sanitizedKey = key.replace(/:/g, '_'); // Sanitize key to avoid invalid characters
      const fileUri = `${storagePath}${sanitizedKey}`;
      await FileSystem.deleteAsync(fileUri, { idempotent: true });
    } catch (error) {
      console.error('Error deleting from FileSystem:', error);
    }
  },
};

export default CustomFileSystemStorage;
