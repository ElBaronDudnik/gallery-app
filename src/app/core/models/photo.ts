export interface Photo {
  id: string;
  alt_description: string;
  user: {
    name: string;
  };
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    small_s3: string;
    thumb: string;
  };
  width: number;
  height: number;
}
